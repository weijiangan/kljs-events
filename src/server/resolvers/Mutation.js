const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: "1h" });

  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: "1h" });

  return {
    token,
    user
  };
}

function createEvent(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createEvent({
    name: args.name,
    organizer: { connect: { id: userId } }
  });
}

function attendEvent(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.updateEvent({
    data: { attendees: { connect: { id: userId } } },
    where: { id: args.eventId }
  });
}

function updateEvent(parent, args, context, info) {
  const { eventId, venue, talks, ...rest } = args;
  const data = { ...rest };
  if (venue) {
    data.venue = {
      upsert: {
        create: { ...venue },
        update: { ...venue }
      }
    };
  }
  return context.prisma.updateEvent({
    data,
    where: { id: args.eventId }
  });
}

function createTalk(parent, args, context, info) {
  const { speaker, ...rest } = args.data;
  console.log(rest);

  return context.prisma.createTalk({
    ...rest,
    speaker: {
      connect: {
        ...speaker
      }
    }
  });
}

module.exports = {
  signup,
  login,
  createEvent,
  attendEvent,
  updateEvent,
  createTalk
};

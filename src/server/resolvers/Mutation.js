const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function getPwHash(password, password2) {
  console.log("getting hash");
  if (password != password2) {
    throw new Error("password and confirm password do not match");
  }
  return new Promise(resolve => {
    bcrypt.hash(password, 10).then(hash => resolve(hash));
  });
}

async function signup(parent, args, context, info) {
  const { password, password2, ...rest } = args;
  const pwHash = await getPwHash(password, password2);
  const user = await context.prisma.createUser({ ...rest, password: pwHash });
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

async function changePassword(parent, args, context, info) {
  const userId = getUserId(context);
  const { password, password2, oldpassword } = args;
  const user = await context.prisma.user({ id: userId });
  const valid = await bcrypt.compare(oldpassword, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const pwHash = await getPwHash(password, password2);
  await context.prisma.updateUser({
    data: { password: pwHash },
    where: { id: userId }
  });
  return 1;
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

// function updateEvent(parent, args, context, info) {
//   const { eventId, venue, talks, ...rest } = args;
//   const data = { ...rest };
//   if (venue) {
//     data.venue = {
//       upsert: {
//         create: { ...venue },
//         update: { ...venue }
//       }
//     };
//   }
//   return context.prisma.updateEvent({
//     data,
//     where: { id: args.eventId }
//   });
// }

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
  // updateEvent,
  createTalk,
  changePassword
};

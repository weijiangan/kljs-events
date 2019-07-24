function events(parent, args, context, info) {
  return context.prisma.events();
}

function event(parent, args, context, info) {
  return context.prisma.event({ id: args.id });
}

function users(parent, args, context, info) {
  return context.prisma.users();
}

function talks(parent, args, context, info) {
  return context.prisma.talks();
}

function talk(parent, args, context, info) {
  return context.prisma.talk({ id: args.id });
}

async function latestEvent(parent, args, context, info) {
  const nowSeconds = new Date().getTime() / 1000;
  let event = await context.prisma.events({
    // Show upcoming event 2 hours after the current one so it won't show
    // future events while there's one ongoing. Should change this when
    // I find a better approach
    where: { timeStart_gt: Math.trunc(nowSeconds) + 7200 },
    orderBy: "timeStart_ASC",
    first: 1
  });
  if (!event.length) {
    event = await context.prisma.events({
      orderBy: "timeStart_DESC",
      first: 1
    });
  }
  return event[0];
}

module.exports = {
  events,
  event,
  users,
  talks,
  talk,
  latestEvent
};

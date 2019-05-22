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

module.exports = {
  events,
  users,
  talks,
  talk
};

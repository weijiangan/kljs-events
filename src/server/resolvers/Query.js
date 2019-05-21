function events(parent, args, context, info) {
  return context.prisma.events();
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

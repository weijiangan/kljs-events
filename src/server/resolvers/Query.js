function events(parent, args, context, info) {
  return context.prisma.events();
}

function users(parent, args, context, info) {
  return context.prisma.users();
}

function talks(parent, args, context, info) {
  return context.prisma.talks();
}

module.exports = {
  events,
  users,
  talks
};

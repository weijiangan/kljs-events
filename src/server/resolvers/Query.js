function events(parent, args, context, info) {
  return context.prisma.events();
}

function users(parent, args, context, info) {
  return context.prisma.users();
}

module.exports = {
  events,
  users
};

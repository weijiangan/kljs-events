function activity(parent, args, context) {
  return context.prisma.eventActivity({ id: parent.id }).activity();
}

module.exports = {
  activity
};

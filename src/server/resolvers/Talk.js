function speaker(parent, args, context) {
  return context.prisma.talk({ id: parent.id }).speaker();
}

function activity(parent, args, context) {
  return context.prisma.talk({ id: parent.id }).activity();
}

module.exports = {
  speaker
};

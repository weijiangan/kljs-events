function speaker(parent, args, context) {
  return context.prisma.talk({ id: parent.id }).speaker();
}

module.exports = {
  speaker
};

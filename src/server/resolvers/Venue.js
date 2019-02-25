function coords(parent, args, context) {
  return context.prisma.venue({ id: parent.id }).coords();
}

module.exports = {
  coords
};

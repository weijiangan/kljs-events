function socials(parent, args, context) {
  return context.prisma.user({ id: parent.id }).socials();
}

function talks(parent, args, context) {
  return context.prisma.talks({ where: { speaker: { id: parent.id } } });
}

module.exports = {
  socials,
  talks
};

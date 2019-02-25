function socials(parent, args, context) {
  return context.prisma.user({ id: parent.id }).socials();
}

module.exports = {
  socials
};

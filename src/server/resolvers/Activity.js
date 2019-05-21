function links(parent, args, context) {
  return context.prisma.activity({ id: parent.id }).links();
}

module.exports = {
  links
};

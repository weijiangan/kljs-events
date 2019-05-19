function organizer(parent, args, context) {
  return context.prisma.event({ id: parent.id }).organizer();
}

function venue(parent, args, context) {
  return context.prisma.event({ id: parent.id }).venue();
}

function attendees(parent, args, context) {
  return context.prisma.event({ id: parent.id }).attendees();
}

function agenda(parent, args, context) {
  return context.prisma.event({ id: parent.id }).agenda();
}

module.exports = {
  organizer,
  attendees,
  agenda,
  venue
};

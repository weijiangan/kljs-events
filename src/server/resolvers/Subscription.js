const { prisma } = require('../generated/prisma-client');

function newEventSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.event({ mutation_in: 'CREATED' }).node();
}

const updateEvent = {
  subscribe: newEventSubscribe,
  resolve: payload => payload
};

module.exports = {
  updateEvent
};

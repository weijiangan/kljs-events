const fragment = `
  fragment All on Talk {
    id
    remarks
    speaker {
      name
    }
    activity {
      type
      title
      description
      length
    }
  }
`;

async function activity(parent, args, context, info) {
  const activity = await context.prisma
    .eventActivity({ id: parent.id })
    .activity();

  if (activity.type === "TALK") {
    const talk = await context.prisma
      .talks({
        where: { activity: { id: activity.id } }
      })
      .$fragment(fragment);
    return talk[0];
  }

  return activity;
}

module.exports = {
  activity
};

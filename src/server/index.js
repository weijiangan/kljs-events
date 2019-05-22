const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Event = require("./resolvers/Event");
const Talk = require("./resolvers/Talk");
const User = require("./resolvers/User");
const Venue = require("./resolvers/Venue");
const Activity = require("./resolvers/Activity");
const EventActivity = require("./resolvers/EventActivity");
const AllActivity = require("./resolvers/AllActivity");
const devServer = require("./dev-server");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Event,
  Talk,
  User,
  Venue,
  Activity,
  EventActivity,
  AllActivity
};

const server = new GraphQLServer({
  typeDefs: "./src/server/schema.graphql",
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

const serverConfig = {
  endpoint: "/graphql",
  playground: "/graphql"
};

server.express.use("/", devServer);

server.start(serverConfig, () =>
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 4000}`
  )
);

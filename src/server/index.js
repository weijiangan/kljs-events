const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Event = require("./resolvers/Event");
const Talk = require("./resolvers/Talk");
const User = require("./resolvers/User");
const Venue = require("./resolvers/Venue");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Event,
  Talk,
  User,
  Venue
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

server.express.set("port", process.env.PORT || 4000);
server.start({ playground: "/graphql" }, () =>
  console.log(
    `Server is running on http://localhost:${server.express.get("port")}`
  )
);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Coordinates",
    embedded: false
  },
  {
    name: "Event",
    embedded: false
  },
  {
    name: "SocialNetworks",
    embedded: false
  },
  {
    name: "SocialProfile",
    embedded: false
  },
  {
    name: "Talk",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Venue",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();

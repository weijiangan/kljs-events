module.exports = {
        typeDefs: /* GraphQL */ `type AggregateCoordinates {
  count: Int!
}

type AggregateEvent {
  count: Int!
}

type AggregateSocialProfile {
  count: Int!
}

type AggregateTalk {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVenue {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Coordinates {
  x: Float!
  y: Float!
}

type CoordinatesConnection {
  pageInfo: PageInfo!
  edges: [CoordinatesEdge]!
  aggregate: AggregateCoordinates!
}

input CoordinatesCreateInput {
  x: Float!
  y: Float!
}

input CoordinatesCreateOneInput {
  create: CoordinatesCreateInput
}

type CoordinatesEdge {
  node: Coordinates!
  cursor: String!
}

enum CoordinatesOrderByInput {
  x_ASC
  x_DESC
  y_ASC
  y_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CoordinatesPreviousValues {
  x: Float!
  y: Float!
}

type CoordinatesSubscriptionPayload {
  mutation: MutationType!
  node: Coordinates
  updatedFields: [String!]
  previousValues: CoordinatesPreviousValues
}

input CoordinatesSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CoordinatesWhereInput
  AND: [CoordinatesSubscriptionWhereInput!]
  OR: [CoordinatesSubscriptionWhereInput!]
  NOT: [CoordinatesSubscriptionWhereInput!]
}

input CoordinatesUpdateDataInput {
  x: Float
  y: Float
}

input CoordinatesUpdateManyMutationInput {
  x: Float
  y: Float
}

input CoordinatesUpdateOneInput {
  create: CoordinatesCreateInput
  update: CoordinatesUpdateDataInput
  upsert: CoordinatesUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
}

input CoordinatesUpsertNestedInput {
  update: CoordinatesUpdateDataInput!
  create: CoordinatesCreateInput!
}

input CoordinatesWhereInput {
  x: Float
  x_not: Float
  x_in: [Float!]
  x_not_in: [Float!]
  x_lt: Float
  x_lte: Float
  x_gt: Float
  x_gte: Float
  y: Float
  y_not: Float
  y_in: [Float!]
  y_not_in: [Float!]
  y_lt: Float
  y_lte: Float
  y_gt: Float
  y_gte: Float
  AND: [CoordinatesWhereInput!]
  OR: [CoordinatesWhereInput!]
  NOT: [CoordinatesWhereInput!]
}

scalar DateTime

type Event {
  id: ID!
  name: String!
  attendees(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  organizer: User!
  talks(where: TalkWhereInput, orderBy: TalkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Talk!]
  venue: Venue
  timeStart: Int
  timeEnd: Int
}

type EventConnection {
  pageInfo: PageInfo!
  edges: [EventEdge]!
  aggregate: AggregateEvent!
}

input EventCreateInput {
  name: String!
  attendees: UserCreateManyInput
  organizer: UserCreateOneInput!
  talks: TalkCreateManyInput
  venue: VenueCreateOneInput
  timeStart: Int
  timeEnd: Int
}

type EventEdge {
  node: Event!
  cursor: String!
}

enum EventOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  timeStart_ASC
  timeStart_DESC
  timeEnd_ASC
  timeEnd_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EventPreviousValues {
  id: ID!
  name: String!
  timeStart: Int
  timeEnd: Int
}

type EventSubscriptionPayload {
  mutation: MutationType!
  node: Event
  updatedFields: [String!]
  previousValues: EventPreviousValues
}

input EventSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EventWhereInput
  AND: [EventSubscriptionWhereInput!]
  OR: [EventSubscriptionWhereInput!]
  NOT: [EventSubscriptionWhereInput!]
}

input EventUpdateInput {
  name: String
  attendees: UserUpdateManyInput
  organizer: UserUpdateOneRequiredInput
  talks: TalkUpdateManyInput
  venue: VenueUpdateOneInput
  timeStart: Int
  timeEnd: Int
}

input EventUpdateManyMutationInput {
  name: String
  timeStart: Int
  timeEnd: Int
}

input EventWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  attendees_every: UserWhereInput
  attendees_some: UserWhereInput
  attendees_none: UserWhereInput
  organizer: UserWhereInput
  talks_every: TalkWhereInput
  talks_some: TalkWhereInput
  talks_none: TalkWhereInput
  venue: VenueWhereInput
  timeStart: Int
  timeStart_not: Int
  timeStart_in: [Int!]
  timeStart_not_in: [Int!]
  timeStart_lt: Int
  timeStart_lte: Int
  timeStart_gt: Int
  timeStart_gte: Int
  timeEnd: Int
  timeEnd_not: Int
  timeEnd_in: [Int!]
  timeEnd_not_in: [Int!]
  timeEnd_lt: Int
  timeEnd_lte: Int
  timeEnd_gt: Int
  timeEnd_gte: Int
  AND: [EventWhereInput!]
  OR: [EventWhereInput!]
  NOT: [EventWhereInput!]
}

input EventWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createCoordinates(data: CoordinatesCreateInput!): Coordinates!
  updateManyCoordinateses(data: CoordinatesUpdateManyMutationInput!, where: CoordinatesWhereInput): BatchPayload!
  deleteManyCoordinateses(where: CoordinatesWhereInput): BatchPayload!
  createEvent(data: EventCreateInput!): Event!
  updateEvent(data: EventUpdateInput!, where: EventWhereUniqueInput!): Event
  updateManyEvents(data: EventUpdateManyMutationInput!, where: EventWhereInput): BatchPayload!
  upsertEvent(where: EventWhereUniqueInput!, create: EventCreateInput!, update: EventUpdateInput!): Event!
  deleteEvent(where: EventWhereUniqueInput!): Event
  deleteManyEvents(where: EventWhereInput): BatchPayload!
  createSocialProfile(data: SocialProfileCreateInput!): SocialProfile!
  updateManySocialProfiles(data: SocialProfileUpdateManyMutationInput!, where: SocialProfileWhereInput): BatchPayload!
  deleteManySocialProfiles(where: SocialProfileWhereInput): BatchPayload!
  createTalk(data: TalkCreateInput!): Talk!
  updateTalk(data: TalkUpdateInput!, where: TalkWhereUniqueInput!): Talk
  updateManyTalks(data: TalkUpdateManyMutationInput!, where: TalkWhereInput): BatchPayload!
  upsertTalk(where: TalkWhereUniqueInput!, create: TalkCreateInput!, update: TalkUpdateInput!): Talk!
  deleteTalk(where: TalkWhereUniqueInput!): Talk
  deleteManyTalks(where: TalkWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVenue(data: VenueCreateInput!): Venue!
  updateVenue(data: VenueUpdateInput!, where: VenueWhereUniqueInput!): Venue
  updateManyVenues(data: VenueUpdateManyMutationInput!, where: VenueWhereInput): BatchPayload!
  upsertVenue(where: VenueWhereUniqueInput!, create: VenueCreateInput!, update: VenueUpdateInput!): Venue!
  deleteVenue(where: VenueWhereUniqueInput!): Venue
  deleteManyVenues(where: VenueWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  coordinateses(where: CoordinatesWhereInput, orderBy: CoordinatesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Coordinates]!
  coordinatesesConnection(where: CoordinatesWhereInput, orderBy: CoordinatesOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CoordinatesConnection!
  event(where: EventWhereUniqueInput!): Event
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event]!
  eventsConnection(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventConnection!
  socialProfiles(where: SocialProfileWhereInput, orderBy: SocialProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SocialProfile]!
  socialProfilesConnection(where: SocialProfileWhereInput, orderBy: SocialProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SocialProfileConnection!
  talk(where: TalkWhereUniqueInput!): Talk
  talks(where: TalkWhereInput, orderBy: TalkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Talk]!
  talksConnection(where: TalkWhereInput, orderBy: TalkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TalkConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  venue(where: VenueWhereUniqueInput!): Venue
  venues(where: VenueWhereInput, orderBy: VenueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Venue]!
  venuesConnection(where: VenueWhereInput, orderBy: VenueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VenueConnection!
  node(id: ID!): Node
}

enum SocialNetworks {
  FACEBOOK
  TWITTER
  GITHUB
  LINKEDIN
  PERSONAL
}

type SocialProfile {
  type: SocialNetworks!
  value: String!
}

type SocialProfileConnection {
  pageInfo: PageInfo!
  edges: [SocialProfileEdge]!
  aggregate: AggregateSocialProfile!
}

input SocialProfileCreateInput {
  type: SocialNetworks!
  value: String!
}

input SocialProfileCreateManyInput {
  create: [SocialProfileCreateInput!]
}

type SocialProfileEdge {
  node: SocialProfile!
  cursor: String!
}

enum SocialProfileOrderByInput {
  type_ASC
  type_DESC
  value_ASC
  value_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SocialProfilePreviousValues {
  type: SocialNetworks!
  value: String!
}

input SocialProfileScalarWhereInput {
  type: SocialNetworks
  type_not: SocialNetworks
  type_in: [SocialNetworks!]
  type_not_in: [SocialNetworks!]
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  AND: [SocialProfileScalarWhereInput!]
  OR: [SocialProfileScalarWhereInput!]
  NOT: [SocialProfileScalarWhereInput!]
}

type SocialProfileSubscriptionPayload {
  mutation: MutationType!
  node: SocialProfile
  updatedFields: [String!]
  previousValues: SocialProfilePreviousValues
}

input SocialProfileSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SocialProfileWhereInput
  AND: [SocialProfileSubscriptionWhereInput!]
  OR: [SocialProfileSubscriptionWhereInput!]
  NOT: [SocialProfileSubscriptionWhereInput!]
}

input SocialProfileUpdateManyDataInput {
  type: SocialNetworks
  value: String
}

input SocialProfileUpdateManyInput {
  create: [SocialProfileCreateInput!]
  deleteMany: [SocialProfileScalarWhereInput!]
  updateMany: [SocialProfileUpdateManyWithWhereNestedInput!]
}

input SocialProfileUpdateManyMutationInput {
  type: SocialNetworks
  value: String
}

input SocialProfileUpdateManyWithWhereNestedInput {
  where: SocialProfileScalarWhereInput!
  data: SocialProfileUpdateManyDataInput!
}

input SocialProfileWhereInput {
  type: SocialNetworks
  type_not: SocialNetworks
  type_in: [SocialNetworks!]
  type_not_in: [SocialNetworks!]
  value: String
  value_not: String
  value_in: [String!]
  value_not_in: [String!]
  value_lt: String
  value_lte: String
  value_gt: String
  value_gte: String
  value_contains: String
  value_not_contains: String
  value_starts_with: String
  value_not_starts_with: String
  value_ends_with: String
  value_not_ends_with: String
  AND: [SocialProfileWhereInput!]
  OR: [SocialProfileWhereInput!]
  NOT: [SocialProfileWhereInput!]
}

type Subscription {
  coordinates(where: CoordinatesSubscriptionWhereInput): CoordinatesSubscriptionPayload
  event(where: EventSubscriptionWhereInput): EventSubscriptionPayload
  socialProfile(where: SocialProfileSubscriptionWhereInput): SocialProfileSubscriptionPayload
  talk(where: TalkSubscriptionWhereInput): TalkSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  venue(where: VenueSubscriptionWhereInput): VenueSubscriptionPayload
}

type Talk {
  id: ID!
  title: String!
  description: String!
  createdAt: DateTime!
  speaker: User!
  length: Int!
  remarks: String
}

type TalkConnection {
  pageInfo: PageInfo!
  edges: [TalkEdge]!
  aggregate: AggregateTalk!
}

input TalkCreateInput {
  title: String!
  description: String!
  speaker: UserCreateOneInput!
  length: Int!
  remarks: String
}

input TalkCreateManyInput {
  create: [TalkCreateInput!]
  connect: [TalkWhereUniqueInput!]
}

type TalkEdge {
  node: Talk!
  cursor: String!
}

enum TalkOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  length_ASC
  length_DESC
  remarks_ASC
  remarks_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TalkPreviousValues {
  id: ID!
  title: String!
  description: String!
  createdAt: DateTime!
  length: Int!
  remarks: String
}

input TalkScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  length: Int
  length_not: Int
  length_in: [Int!]
  length_not_in: [Int!]
  length_lt: Int
  length_lte: Int
  length_gt: Int
  length_gte: Int
  remarks: String
  remarks_not: String
  remarks_in: [String!]
  remarks_not_in: [String!]
  remarks_lt: String
  remarks_lte: String
  remarks_gt: String
  remarks_gte: String
  remarks_contains: String
  remarks_not_contains: String
  remarks_starts_with: String
  remarks_not_starts_with: String
  remarks_ends_with: String
  remarks_not_ends_with: String
  AND: [TalkScalarWhereInput!]
  OR: [TalkScalarWhereInput!]
  NOT: [TalkScalarWhereInput!]
}

type TalkSubscriptionPayload {
  mutation: MutationType!
  node: Talk
  updatedFields: [String!]
  previousValues: TalkPreviousValues
}

input TalkSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TalkWhereInput
  AND: [TalkSubscriptionWhereInput!]
  OR: [TalkSubscriptionWhereInput!]
  NOT: [TalkSubscriptionWhereInput!]
}

input TalkUpdateDataInput {
  title: String
  description: String
  speaker: UserUpdateOneRequiredInput
  length: Int
  remarks: String
}

input TalkUpdateInput {
  title: String
  description: String
  speaker: UserUpdateOneRequiredInput
  length: Int
  remarks: String
}

input TalkUpdateManyDataInput {
  title: String
  description: String
  length: Int
  remarks: String
}

input TalkUpdateManyInput {
  create: [TalkCreateInput!]
  update: [TalkUpdateWithWhereUniqueNestedInput!]
  upsert: [TalkUpsertWithWhereUniqueNestedInput!]
  delete: [TalkWhereUniqueInput!]
  connect: [TalkWhereUniqueInput!]
  set: [TalkWhereUniqueInput!]
  disconnect: [TalkWhereUniqueInput!]
  deleteMany: [TalkScalarWhereInput!]
  updateMany: [TalkUpdateManyWithWhereNestedInput!]
}

input TalkUpdateManyMutationInput {
  title: String
  description: String
  length: Int
  remarks: String
}

input TalkUpdateManyWithWhereNestedInput {
  where: TalkScalarWhereInput!
  data: TalkUpdateManyDataInput!
}

input TalkUpdateWithWhereUniqueNestedInput {
  where: TalkWhereUniqueInput!
  data: TalkUpdateDataInput!
}

input TalkUpsertWithWhereUniqueNestedInput {
  where: TalkWhereUniqueInput!
  update: TalkUpdateDataInput!
  create: TalkCreateInput!
}

input TalkWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  speaker: UserWhereInput
  length: Int
  length_not: Int
  length_in: [Int!]
  length_not_in: [Int!]
  length_lt: Int
  length_lte: Int
  length_gt: Int
  length_gte: Int
  remarks: String
  remarks_not: String
  remarks_in: [String!]
  remarks_not_in: [String!]
  remarks_lt: String
  remarks_lte: String
  remarks_gt: String
  remarks_gte: String
  remarks_contains: String
  remarks_not_contains: String
  remarks_starts_with: String
  remarks_not_starts_with: String
  remarks_ends_with: String
  remarks_not_ends_with: String
  AND: [TalkWhereInput!]
  OR: [TalkWhereInput!]
  NOT: [TalkWhereInput!]
}

input TalkWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  createdAt: DateTime!
  name: String!
  middleName: String
  email: String!
  password: String!
  description: String
  socials(where: SocialProfileWhereInput, orderBy: SocialProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SocialProfile!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  middleName: String
  email: String!
  password: String!
  description: String
  socials: SocialProfileCreateManyInput
}

input UserCreateManyInput {
  create: [UserCreateInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  name_ASC
  name_DESC
  middleName_ASC
  middleName_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  description_ASC
  description_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  name: String!
  middleName: String
  email: String!
  password: String!
  description: String
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  middleName: String
  middleName_not: String
  middleName_in: [String!]
  middleName_not_in: [String!]
  middleName_lt: String
  middleName_lte: String
  middleName_gt: String
  middleName_gte: String
  middleName_contains: String
  middleName_not_contains: String
  middleName_starts_with: String
  middleName_not_starts_with: String
  middleName_ends_with: String
  middleName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  name: String
  middleName: String
  email: String
  password: String
  description: String
  socials: SocialProfileUpdateManyInput
}

input UserUpdateInput {
  name: String
  middleName: String
  email: String
  password: String
  description: String
  socials: SocialProfileUpdateManyInput
}

input UserUpdateManyDataInput {
  name: String
  middleName: String
  email: String
  password: String
  description: String
}

input UserUpdateManyInput {
  create: [UserCreateInput!]
  update: [UserUpdateWithWhereUniqueNestedInput!]
  upsert: [UserUpsertWithWhereUniqueNestedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  set: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyMutationInput {
  name: String
  middleName: String
  email: String
  password: String
  description: String
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  middleName: String
  middleName_not: String
  middleName_in: [String!]
  middleName_not_in: [String!]
  middleName_lt: String
  middleName_lte: String
  middleName_gt: String
  middleName_gte: String
  middleName_contains: String
  middleName_not_contains: String
  middleName_starts_with: String
  middleName_not_starts_with: String
  middleName_ends_with: String
  middleName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  socials_every: SocialProfileWhereInput
  socials_some: SocialProfileWhereInput
  socials_none: SocialProfileWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Venue {
  id: ID!
  name: String!
  address: String!
  googPlaceId: String
  coords: Coordinates
}

type VenueConnection {
  pageInfo: PageInfo!
  edges: [VenueEdge]!
  aggregate: AggregateVenue!
}

input VenueCreateInput {
  name: String!
  address: String!
  googPlaceId: String
  coords: CoordinatesCreateOneInput
}

input VenueCreateOneInput {
  create: VenueCreateInput
  connect: VenueWhereUniqueInput
}

type VenueEdge {
  node: Venue!
  cursor: String!
}

enum VenueOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  address_ASC
  address_DESC
  googPlaceId_ASC
  googPlaceId_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VenuePreviousValues {
  id: ID!
  name: String!
  address: String!
  googPlaceId: String
}

type VenueSubscriptionPayload {
  mutation: MutationType!
  node: Venue
  updatedFields: [String!]
  previousValues: VenuePreviousValues
}

input VenueSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VenueWhereInput
  AND: [VenueSubscriptionWhereInput!]
  OR: [VenueSubscriptionWhereInput!]
  NOT: [VenueSubscriptionWhereInput!]
}

input VenueUpdateDataInput {
  name: String
  address: String
  googPlaceId: String
  coords: CoordinatesUpdateOneInput
}

input VenueUpdateInput {
  name: String
  address: String
  googPlaceId: String
  coords: CoordinatesUpdateOneInput
}

input VenueUpdateManyMutationInput {
  name: String
  address: String
  googPlaceId: String
}

input VenueUpdateOneInput {
  create: VenueCreateInput
  update: VenueUpdateDataInput
  upsert: VenueUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: VenueWhereUniqueInput
}

input VenueUpsertNestedInput {
  update: VenueUpdateDataInput!
  create: VenueCreateInput!
}

input VenueWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  address: String
  address_not: String
  address_in: [String!]
  address_not_in: [String!]
  address_lt: String
  address_lte: String
  address_gt: String
  address_gte: String
  address_contains: String
  address_not_contains: String
  address_starts_with: String
  address_not_starts_with: String
  address_ends_with: String
  address_not_ends_with: String
  googPlaceId: String
  googPlaceId_not: String
  googPlaceId_in: [String!]
  googPlaceId_not_in: [String!]
  googPlaceId_lt: String
  googPlaceId_lte: String
  googPlaceId_gt: String
  googPlaceId_gte: String
  googPlaceId_contains: String
  googPlaceId_not_contains: String
  googPlaceId_starts_with: String
  googPlaceId_not_starts_with: String
  googPlaceId_ends_with: String
  googPlaceId_not_ends_with: String
  coords: CoordinatesWhereInput
  AND: [VenueWhereInput!]
  OR: [VenueWhereInput!]
  NOT: [VenueWhereInput!]
}

input VenueWhereUniqueInput {
  id: ID
}
`
      }
    
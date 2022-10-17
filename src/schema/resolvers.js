import MenuItem from "./MenuItem";
import User from "./User";

const resolvers = {
  Query: {
    ...MenuItem.resolvers.Query,
    ...User.resolvers.Query
  },

  Mutation: {
    ...MenuItem.resolvers.Mutation,
    ...User.resolvers.Mutation
  },
};

export default resolvers;

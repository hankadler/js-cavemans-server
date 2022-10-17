const resolvers = {
  Query: {
    users: async (parent, args, { dataSources, state }) => {
      await dataSources.User.authorize(state.token, "CLIENT");
      return dataSources.User.find();
    },

    user: async (parent, { userId }, { dataSources, state }) => {
      await dataSources.User.authorize(state.token, "CLIENT");
      return dataSources.User.findById(userId);
    },
  },

  Mutation: {
    deleteUsers: async (parent, args, { dataSources, state }) => {
      await dataSources.User.authorize(state.token, "ADMIN");
      return dataSources.User.deleteMany();
    },

    createUser: async (parent, { input }, { dataSources }) => (
      dataSources.User.create(input)
    ),

    login: async (parent, { name, password }, { dataSources, setState }) => {
      const { user, token } = await dataSources.User.login(name, password);
      setState("token", token);
      return user;
    },

    logout: async (parent, args, { setState }) => {
      setState("token", "");
      return { message: "Logged out." };
    },

    updateUser: async (parent, { userId, input }, { dataSources, state }) => {
      await dataSources.User.authenticate(state.token, userId);
      return dataSources.User.findByIdAndUpdate(userId, input);
    },

    deleteUser: async (parent, { userId }, { dataSources, state }) => {
      await dataSources.User.authenticate(state.token, userId);
      const user = await dataSources.User.findByIdAndDelete(userId);
      return {
        acknowledged: true,
        deletedCount: user ? 1 : 0
      };
    }
  }
};

export default resolvers;

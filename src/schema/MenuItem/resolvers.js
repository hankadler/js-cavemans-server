const resolvers = {
  Query: {
    menuItems: async (parent, args, { dataSources }) => (
      dataSources.MenuItem.find()
    ),

    menuItemsByType: async (parent, { type }, { dataSources }) => (
      dataSources.MenuItem.find({ type })
    ),

    menuItem: async (parent, { menuItemId }, { dataSources }) => (
      dataSources.MenuItem.findById(menuItemId)
    ),

    foods: async (parent, args, { dataSources }) => (
      dataSources.MenuItem.find({ type: "FOOD" })
    ),

    sides: async (parent, args, { dataSources }) => (
      dataSources.MenuItem.find({ type: "SIDE" })
    ),

    sauces: async (parent, args, { dataSources }) => (
      dataSources.MenuItem.find({ type: "SAUCES" })
    ),

    drinks: async (parent, args, { dataSources }) => (
      dataSources.MenuItem.find({ type: "DRINK" })
    ),

    desserts: async (parent, args, { dataSources }) => (
      dataSources.MenuItem.find({ type: "DESSERT" })
    )
  },

  Mutation: {
    deleteMenuItems: async (parent, args, { dataSources }) => (
      dataSources.MenuItem.deleteMany()
    ),

    createMenuItem: async (parent, { input }, { dataSources }) => (
      dataSources.MenuItem.create(input)
    ),

    updateMenuItem: async (parent, { menuItemId, input }, { dataSources }) => (
      dataSources.MenuItem.findByIdAndUpdate(menuItemId, input)
    ),

    deleteMenuItem: async (parent, { menuItemId }, { dataSources }) => {
      const menuItem = await dataSources.MenuItem.findByIdAndDelete(menuItemId);
      return {
        acknowledged: true,
        deletedCount: menuItem ? 1 : 0
      };
    }
  }
};

export default resolvers;

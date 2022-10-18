import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    menuItems: [MenuItem!]!
    menuItemsByType(type: MenuItemType!): [MenuItem!]!
    menuItem(menuItemId: ID!): MenuItem
    foods: [MenuItem!]!
    sides: [MenuItem!]!
    sauces: [MenuItem!]!
    drinks: [MenuItem!]!
    desserts: [MenuItem!]!
  }
  
  extend type Mutation {
    deleteMenuItems: DeleteOutput!
    createMenuItem(input: CreateMenuItemInput!): MenuItem
    updateMenuItem(menuItemId: ID!, input: UpdateMenuItemInput!): MenuItem
    deleteMenuItem(menuItemId: ID!): DeleteOutput!
  }
 
  type MenuItem {
    _id: ID!
    type: MenuItemType!
    image: String
    name: String!
    description: String
    price: Float!
  }
  
  enum MenuItemType {
    FOOD
    SIDE
    SAUCE
    DRINK
    DESSERT
  }

  input CreateMenuItemInput {
    type: MenuItemType!
    image: String!
    name: String!
    description: String!
    price: Float!
  }

  input UpdateMenuItemInput {
    type: MenuItemType
    image: String
    name: String
    description: String
    price: Float
  }
`;

export default typeDefs;

import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    users: [User!]!
    user(userId: ID!): User
  }

  extend type Mutation {
    deleteUsers: DeleteOutput!
    createUser(input: CreateUserInput!): User
    login(name: String!, password: String!): User
    logout: LogoutOutput!
    updateUser(userId: ID!, input: UpdateUserInput!): User
    deleteUser(userId: ID!): DeleteOutput!
  }

  type User {
    _id: ID!
    name: String!
    role: UserRole!
  }

  enum UserRole {
    ADMIN
    CLIENT
  }

  input CreateUserInput {
    name: String!
    password: String!
    passwordAgain: String!
  }

  input UpdateUserInput {
    name: String
    oldPassword: String
    newPassword: String
    newPasswordAgain: String
  }
  
  type LogoutOutput {
    message: String!
  }
`;

export default typeDefs;

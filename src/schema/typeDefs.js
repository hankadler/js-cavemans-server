import { gql } from "apollo-server-express";
import MenuItem from "./MenuItem";
import User from "./User";

export default gql`
  type Query {
    _: String
  }
  
  type Mutation {
    _: String
  }
  
  type DeleteOutput {
    acknowledged: Boolean!
    deletedCount: Int!
  }
  
  ${MenuItem.typeDefs}
  ${User.typeDefs}
`;

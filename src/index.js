import { ApolloServer } from "apollo-server";
import config from "./config";
import db from "./db";
import { typeDefs, resolvers, context, dataSources } from "./schema";

const main = async () => {
  await db.connect(config.db.uri);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    dataSources,
    csrfPrevention: true
  });

  const { url } = await server.listen();
  console.log(`GraphQL: ${url}`);
};

main().catch((error) => console.log(error.message));

import { ApolloServer } from "apollo-server-express";
import express from "express";
import config from "./config";
import db from "./db";
import routes from "../etc/routes";
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

  const app = express();
  app.use(express.static("../client/src/common/assets/images"));
  routes.forEach((route) => app.use(route, express.static("../client/dist")));

  await server.start();

  server.applyMiddleware({ app });

  app.listen(config.port, () => {
    console.log(`app @ http://localhost:${config.port}`);
    console.log(`graphql @ http://localhost:${config.port}${server.graphqlPath}`);
  });
};

main().catch((error) => console.log(error.message));

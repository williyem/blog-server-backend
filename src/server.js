const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("Hello from the express apollo server");
  });

  await mongoose.connect(
    "  mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  console.log("Mongoose connected");

  app.listen(5000, () => console.log(`Server is running on port server 5000`));
}
startServer();

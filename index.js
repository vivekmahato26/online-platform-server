const express = require("express");
const { ApolloServer } = require("apollo-server-express");

var AWS = require("aws-sdk");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

// AWS.config.update(
//   {
//     region: process.env.AWS_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//   }
// );

const typeDefs = require("./schema/index");
const resolvers = require("./resolvers/index");
const auth = require("./middlewares/auth");

const app = express();

app.use(cookieParser());

app.use(auth);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: ({ req, res }) => {
      return { req, res };
    },
  });
  const cors = {
    credentials: true,
    origin: "*",
  };

  await server.start();
  server.applyMiddleware({ app, path: "/", cors });
};

startServer();
app.listen(4000, () => console.log("server running at port 4000🚀"));

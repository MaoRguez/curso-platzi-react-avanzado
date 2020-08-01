const express = require('express');
// eslint-disable-next-line import/no-unresolved
const cors = require('cors');
// eslint-disable-next-line import/no-unresolved
const { ApolloServer } = require('apollo-server-express');
// eslint-disable-next-line import/no-unresolved
const jwt = require('express-jwt');
const { resolvers, typeDefs } = require('./schema');

// this is not secure! this is for dev purposes
process.env.JWT_SECRET = process.env.JWT_SECRET || 'somereallylongsecretkey';

const PORT = process.env.PORT || 3500;
const app = express();
const { categories } = require('./db.json');

app.use(cors());

// auth middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
});

require('./adapter');

// eslint-disable-next-line no-unused-vars
const server = new ApolloServer({
  introspection: true, // do this only for dev purposes
  playground: true, // do this only for dev purposes
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const { id, email } = req.user || {};
    return { id, email };
  },
});

app.use(auth);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  res.status(status).json(err);
};
app.use(errorHandler);

app.get('/categories', (req, res) => {
  res.send(categories);
});

if (!process.env.NOW_REGION) {
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/graphql`);
  });
}

module.exports = app;

const { ApolloServer } = require('apollo-server');
const { resolvers, typeDefs } = require('./schema');
const mongoose = require('mongoose');


const validateToken = authToken => {
  // ... validate token and return a Promise, rejects in case of an error
};

const findUser = authToken => {
  return tokenValidationResult => {
    // ... finds user by auth token and return a Promise, rejects in case of an error
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      // if (connectionParams.authToken) {
      //   return validateToken(connectionParams.authToken)
      //     .then(findUser(connectionParams.authToken))
      //     .then(user => {
      //       return {
      //         currentUser: user,
      //       };
      //     });
      // }

      // throw new Error('Missing auth token!');
    },
    onDisconnect: (webSocket, context) => {
      // ...
    },
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
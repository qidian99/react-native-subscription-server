const { PubSub, withFilter } = require('apollo-server');
const gql = require('graphql-tag');
const postController = require('./postController');

const pubsub = new PubSub();

const typeDefs = gql`
  type Subscription {
    postAdded: Post
    commentAdded: Comment
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    addPost(author: String, comment: String): Post
  }

  type Comment {
    id: String
    content: String
  }

  type Post {
    author: String
    comment: String
  }
`;

const POST_ADDED = 'POST_ADDED';

const resolvers = {
  Subscription: {
    postAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([POST_ADDED]),
    },
    commentAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('COMMENT_ADDED'),
        (payload, variables) => {
         return payload.commentAdded.repository_name === variables.repoFullName;
        },
      ),
    }
  },
  Query: {
    posts(root, args, context) {
      return postController.posts();
    },
  },
  Mutation: {
    addPost(root, args, context) {
      pubsub.publish(POST_ADDED, { postAdded: args });
      return postController.addPost(args);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
}
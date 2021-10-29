const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    description: String
    author: String
    likes: Int
    dislikes: Int
  }

  type Query {
    getAllPosts: [Post]

    getPost(id: ID): Post
  }

  input PostInput {
    title: String
    description: String
    author: String
  }
  input PostInput {
    title: String
    description: String
    author: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
    likePost(id: ID): String
    dislikePost(id: ID): String
  }
`;

module.exports = typeDefs;

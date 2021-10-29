const Post = require("./models/Post.model");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello world";
    },
    getAllPosts: async () => {
      return await Post.find();
    },
    getPost: async (_parent, args, _context, _info) => {
      const { id } = args;
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description, author } = args.post;
      const post = new Post({ title, description, author });
      await post.save();
      return post;
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return "Post has been deleted";
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description, author } = args.post;
      const updates = {};
      if (title !== undefined) {
        updates.title = title;
      }
      if (description !== undefined) {
        updates.description = description;
      }
      if (author !== undefined) {
        updates.author = author;
      }

      const post = await Post.findByIdAndUpdate(
        id,
        { title, description, author },
        { new: true }
      );
      return post;
    },
  },
};

module.exports = resolvers;

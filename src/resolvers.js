const Post = require("./models/Post.model");

const resolvers = {
  Query: {
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
      const { title, description, author, likes, dislikes } = args.post;
      const post = new Post({ title, description, author, likes, dislikes });
      if (likes === undefined) {
        post.likes = 0;
      }
      if (dislikes === undefined) {
        post.dislikes = 0;
      }

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
      await Post.updateOne(id);
    },

    likePost: async (parent, args, context, info) => {
      const { id } = args;
      const { likes } = Post.findById(id);
      await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } });
      return "post has been liked";
    },
    dislikePost: async (parent, args, context, info) => {
      const { id } = args;
      const { likes } = Post.findById(id);
      await Post.findByIdAndUpdate(id, { $inc: { dislikes: 1 } });
      return "post has been disliked";
    },
  },
};

module.exports = resolvers;

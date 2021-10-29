const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;

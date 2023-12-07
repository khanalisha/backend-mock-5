const mongoose = require("mongoose");

const BlogsSchema = mongoose.Schema({
  username: String,
  title: String,
  content: String,
  category: String,
  date: String,
  like: Number,
  comments: [
    {
      username: String,
      content: String,
    },
  ],
});

const blogsModel = mongoose.model("blogs", BlogsSchema);
module.exports = {
  blogsModel,
};

const express = require("express");
const { blogsModel } = require("../model/blogSchema");
const { auth } = require("../middlewear/auth");
const BlogsRoutes = express.Router();

BlogsRoutes.use(auth);

BlogsRoutes.post("/api/blogs", async (req, res) => {
  const { username, title, content, category, date, like, comments } = req.body;
  try {
    const userblog = new blogsModel({
      username,
      title,
      content,
      category,
      date,
      like,
      comments,
    });
    await userblog.save();
    res.status(200).json({ msg: "blogs added", userblog });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// BlogsRoutes.get("/api/blogs", async (req, res) => {
//   try {
//     const Allblog = await blogsModel.find();

//     res.status(200).json({ msg: "get blogs", Allblog });
//   } catch (error) {
//     res.status(400).json({ error: error });
//   }
// });

BlogsRoutes.patch("/api/blogs/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const updatePost = req.body;
  const username = req.body.username;

  try {
    const UpdateUserBlog = await blogsModel.findByIdAndUpdate(
      { _id: id, username },
      updatePost,
      { new: true }
    );
    if (!UpdateUserBlog) {
      res.status(400).json({ msg: "blogs not updated" });
    }
    res
      .status(200)
      .json({ mag: `Blogs Updated now of user ${id}!`, UpdateUserBlog });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

BlogsRoutes.delete("/api/blogs/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const username = req.body.username;

  try {
    const deleteUserBlog = await blogsModel.findByIdAndDelete({
      _id: id,
      username,
    });
    if (!deleteUserBlog) {
      res.status(400).json({ msg: "blogs not deleted" });
    }
    res
      .status(200)
      .json({ mag: `Blogs Deleted now of user ${id}!`, deleteUserBlog });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

BlogsRoutes.get("/api/blogs", async (req, res) => {
  const { title } = req.query;

  try {
    const Blogs = await blogsModel.find({
      title: { $regex: new RegExp(title, "i") },
    });
    if (Blogs.length === 0) {
      res.status(404).json({ msg: "No blogs Mathches" });
    }
    res.status(200).json({ mag: "Blogs match !", Blogs });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = {
  BlogsRoutes,
};

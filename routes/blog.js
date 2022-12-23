const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "/src/my-images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  },
});

const upload = multer({ storage: storage });

router.post("/create-blog", upload.single("image"), async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    body: req.body.body,
    image: req.file.path,
  });
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/blogs/:id", (req, res) => {
  res.json(res.blog);
});

router.put("/blogs/:id", async (req, res) => {
  if (req.body.title != null) {
    res.blog.title = req.body.title;
  }
  if (req.body.body != null) {
    res.blog.body = req.body.body;
  }
  if (req.body.image != null) {
    res.blog.image = req.body.image;
  }
  try {
    const updatedBlog = await res.blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

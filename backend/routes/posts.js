const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Create a post
router.post("/", async (req, res) => {
  const { content, userId } = req.body;
  try {
    const post = new Post({ content, userId });
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username"); // Populate user details
    res.json({ message: "All posts fetched successfully", posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
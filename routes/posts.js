const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all posts from all users (public feed)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email');
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get posts by current logged-in user only
router.get('/my-posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .populate('author', 'name email');
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single post by ID (public access for viewing, auth required for checking ownership)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    const post = new Post({
      title,
      content,
      tags: tags || [],
      author: req.user._id
    });
    
    await post.save();
    await post.populate('author', 'name email');
    
    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    
    const post = await Post.findOne({ 
      _id: req.params.id, 
      author: req.user._id 
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    
    await post.save();
    await post.populate('author', 'name email');
    
    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ 
      _id: req.params.id, 
      author: req.user._id 
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

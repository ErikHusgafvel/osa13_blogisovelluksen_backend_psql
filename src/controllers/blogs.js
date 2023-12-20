const router = require('express').Router();

const Blog = require('../models/blogs');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog && req.body.likes >= 0) {
    blog.likes = req.body.likes;
    await blog.save();
    res.status(200).json(blog);
  } else {
    res.status(400).end();
  }
});

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    blog.destroy();
    return res.status(204).end();
  } else {
    return res.status(404).json({ error: 'Blog not found' });
  }
});

module.exports = router;

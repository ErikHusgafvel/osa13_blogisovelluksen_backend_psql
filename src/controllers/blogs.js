const router = require('express').Router();

const Blog = require('../models/blogs');

router.get('/', async (req, res) => {
  const notes = await Blog.findAll();
  res.json(notes);
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(400).json({ error: error.message });
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

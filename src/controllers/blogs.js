const router = require('express').Router();

const { ValidationError } = require('sequelize');
const Blog = require('../models/blogs');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) throw new ReferenceError();
  next();
};

router.put('/:id', blogFinder, async (req, res) => {
  if (req.body.likes && req.body.likes >= 0) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.status(200).json(req.blog);
  } else {
    throw new ValidationError(
      '"likes" must be not-null and non-negative value'
    );
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  req.blog.destroy();
  return res.status(204).end();
});

module.exports = router;

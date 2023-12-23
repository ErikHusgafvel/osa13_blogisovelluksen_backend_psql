const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { ValidationError } = require('sequelize');
const { Blog } = require('../models');
const User = require('../models/user');

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log(authorization.substring(7));
    req.decodedToken = jwt.verify(
      authorization.substring(7),
      process.env.SECRET
    );
  } else {
    return res.status(401).json({ error: 'invalid token' });
  }
  next();
};

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.status(201).json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) throw new Error('NOT FOUND');
  next();
};

router.put('/:id', blogFinder, async (req, res) => {
  if (req.body.likes && req.body.likes >= 0) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.status(200).json(req.blog);
  } else {
    throw new ValidationError('likes must be a non-negative value');
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  req.blog.destroy();
  return res.status(204).end();
});

module.exports = router;

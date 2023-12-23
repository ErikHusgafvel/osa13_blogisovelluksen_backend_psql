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
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  next();
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) throw new Error('blog not found');
  next();
};

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.status(201).json(blog);
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.body.likes && req.body.likes >= 0) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.status(200).json(req.blog);
  } else {
    throw new ValidationError('likes must be a non-negative value');
  }
});

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (user.id === req.blog.userId) {
    await req.blog.destroy();
    return res.status(204).end();
  } else {
    return res.status(401).json({ error: 'unauthorized action' });
  }
});

module.exports = router;

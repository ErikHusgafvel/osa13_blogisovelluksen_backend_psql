const bcrypt = require('bcrypt');
require('dotenv').config();
const router = require('express').Router();
const { User, Blog } = require('../models');
const { ValidationError, Error } = require('sequelize');

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt'] },
    include: {
      model: Blog,
      as: 'markedBlogs',
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      through: {
        attributes: [],
      },
    },
  });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(404).json({ error: 'user with given id not found' });
  }
});

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['id', 'passwordHash'] },
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  /** Password validation */
  if (!req.body.password) {
    throw new ValidationError('password required');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  const user = await User.create({ ...req.body, passwordHash });
  res.status(201).json(user);
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (!user) throw new Error('user not found');
  if (req.body.name) {
    user.name = req.body.name;
    await user.save();
    res.status(200).json(user);
  } else {
    throw new ValidationError('name missing a value!');
  }
});

module.exports = router;

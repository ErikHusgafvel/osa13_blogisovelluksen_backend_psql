const router = require('express').Router();
const { ValidationError } = require('sequelize');
const { Readings, Blog } = require('../models');
const { tokenExtractor } = require('../utils/middleware');

router.post('/', tokenExtractor, async (req, res) => {
  if (!req.body.user_id) {
    throw new ValidationError('user_id required');
  }

  if (!req.body.blog_id) {
    throw new ValidationError('blog_id required');
  }

  const user = await Blog.findByPk(req.decodedToken.id);
  if (user.id === req.body.user_id) {
    const reading = await Readings.create({
      userId: req.body.user_id,
      blogId: req.body.blog_id,
    });
    res.status(201).json(reading);
  } else {
    return res.status(401).json({ error: 'unauthorized action' });
  }
});

router.put('/:id', tokenExtractor, async (req, res) => {
  if (typeof req.body.read === 'undefined') {
    return res.status(400).json({ error: "body missing value for 'read'" });
  }

  const reading = await Readings.findByPk(req.params.id);

  if (!reading) {
    res.status(404).json({ error: 'resource with given id not found' });
  }

  if (req.decodedToken.id === reading.userId) {
    reading.read = req.body.read;
    await reading.save();
    res.status(201).json(reading);
  } else {
    return res.status(401).json({ error: 'unauthorized action' });
  }
});

module.exports = router;

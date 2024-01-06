const jwt = require('jsonwebtoken');

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  switch (error.name) {
    case 'SequelizeValidationError':
      return res
        .status(400)
        .json({ error: error.errors.map((error) => error.message) });
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' });
    case 'SequelizeBaseError':
      return res.status(404).send({ error: 'resource not found' });
    default:
      return res.status(400).json({ error: error.message });
  }
};

const unknownEndpoint = (_req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

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

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
};

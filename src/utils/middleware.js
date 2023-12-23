const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  switch (error.name) {
    case 'SequelizeBaseError':
      return res.status(404).send({ error: 'resource not found' });
    case 'SequelizeValidationError':
      return res
        .status(400)
        .json({ error: error.errors.map((error) => error.message) });
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' });
  }

  next(error);
};

const unknownEndpoint = (_req, res) => {
  res.status(404).json({ error: 'unknown endpoint' });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
};

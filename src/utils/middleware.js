const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'SequelizeBaseError' && error.message === 'NOT FOUND') {
    return res.status(404).send({ error: 'resource not found' });
  } else if (error.name === 'SequelizeValidationError') {
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) });
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

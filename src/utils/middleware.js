const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'ReferenceError') {
    return res
      .status(400)
      .send({ error: 'malformatted id - object not found' });
  } else if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message });
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

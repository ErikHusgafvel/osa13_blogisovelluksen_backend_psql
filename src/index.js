const express = require('express');
require('express-async-errors');
const app = express();
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');

const { PORT } = require('./utils/config');
const { connectToDatabase } = require('./utils/db');

const morgan = require('morgan');

app.use(express.json());

morgan.token('body-to-json', (req) => {
  return JSON.stringify(req.body || {});
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body-to-json'
  )
);

/** Please, notice that the app is using export-async-errors library!
 * Thus, errors are handled "under the hood".
 * Library passes the error automatically to the errorHandler-middleware
 * defined in './utils/middleware.js' taken to use below.
 *
 * Thus, no async/await try-catch or Promise.then(...).catch(...) structures are needed
 * in controllers!
 */

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();

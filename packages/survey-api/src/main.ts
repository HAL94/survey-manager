import app from './app';

const port = process.env.PORT || 5000;
// app.use(middlewares.errorHandler);
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

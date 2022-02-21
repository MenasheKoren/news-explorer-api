// server.js
const app = require('./app');

const { PORT = 8000 } = process.env;

app.listen(PORT, () => {
  // todo Find way to remove comment below
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

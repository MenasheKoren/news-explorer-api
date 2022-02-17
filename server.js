//server.js
const app = require("./app");
const { PORT = 8000} = process.env

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}.`);
});

const express = require("express");

//rest obj
const app = express();

//route
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food server</h1>");
});

//PORT
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

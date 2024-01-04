const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

//dotenv config
dotenv.config();

//rest obj
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food server</h1>");
});

//PORT
const PORT = process.env.PORT || 500;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

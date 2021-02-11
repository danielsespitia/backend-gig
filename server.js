require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db");

const userRouter = require("./src/routes/user");
const messageRouter = require("./src/routes/message");

const port = process.env.PORT || 8000;

const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

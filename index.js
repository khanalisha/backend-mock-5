const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { UserRoutes } = require("./route/userRoute");
const { BlogsRoutes } = require("./route/blogsRouter");
const app = express();
app.use(express.json());
app.use(cors());

app.use(UserRoutes);
app.use(BlogsRoutes);
app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db is created");
    console.log(`data running ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});

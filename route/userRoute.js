const { userModel } = require("../model/userSchema");
require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const UserRoutes = express.Router();

UserRoutes.post("/api/register", async (req, res) => {
  const { username, Avatar, email, password } = req.body;
  try {
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      res.status(400).json({ msg: "use another mail this is already there!" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new userModel({
          ...req.body,
          password: hash,
        });
        await user.save();
        res.send({ msg: "you are now registerd now!", user });
      });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

UserRoutes.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await userModel.findOne({ email });
    bcrypt.compare(password, existinguser.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userId: existinguser._id },
          process.env.secretkey
        );
        res
          .status(200)
          .json({ mag: "Login Sucess!", token: token, existinguser });
      } else {
        res.status(401).json({ err: err.message });
      }
    });
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

module.exports = {
  UserRoutes,
};

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../model/User");
const model2 = require("../model/Words");
const User = model.User;

exports.SignUp = async (req, res) => {
  try {
    const valid = await User.findOne({ email: req.body.email });
    if (valid) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }
    const user = new User(req.body);
    const words = new model2.words({
      userid: user.id,
      hi: 0,
      ja: 0,
      fr: 0,
      es: 0,
    });
    words.save();
    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    user.token = token;
    const hashed = await bcrypt.hash(req.body.password, 10);
    user.password = hashed;
    await user.save();
    res.status(201).json({
      token,
      message: "Signup successfull",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message: "invalid email",
      });
    }
    const verify = await bcrypt.compare(req.body.password, user.password);
    if (!verify) {
      return res.status(401).json({
        message: "wrong password",
      });
    }
    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    user.token = token;
    const output = await user.save();

    res.status(201).json({
      token,
      message: "Login successful",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

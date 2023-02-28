const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../error");

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    // console.log(hashpassword)
    const newUser = new User({ ...req.body, password: hashpassword });
    // console.log(newUser)
    const savedUser = await newUser.save();
    console.log(`new User Created :  `, savedUser);
    res.status(201).send(savedUser);
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};
const login = async (req, res, next) => {
  try {
    //  console.log(req.body)
    //check if email exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    console.log(user);
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return next(createError(400, "Wrong Credentials"));
    }

    //create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });

    //extracting password and showing necessay details
    const { password, ...others } = user._doc;

    res.cookie("access_token", token).status(200).json(others);
    // console.log(others);
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

module.exports = { register, login };

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// Signup
const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      redirectToSignIn: true,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate key error" });
    }
    throw err;
  }
});

// Signin
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
});

module.exports = {
  signup,
  signin,
};

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { logger } = require("../config/logger.config");

/**
 * Helper function to create user
 * @param data - user details to create user
 * @param filePath - file path to upload user profile picture
 */
async function registerUser(data, filePath) {
  try {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User({
      name,
      proPic: filePath || "",
      email,
      password,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();

    return {
      name: user.name,
      token: user.token,
    };
  } catch (error) {
    logger.error("Error in register user helper", { error: error?.message });
    throw new Error(error);
  }
}

/** Helper function to login user
 * @param data - user details to login user to the system
 */
async function loginUser(data) {
  try {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();

    return {
      name: user.name,
      token: user.token,
    };
  } catch (error) {
    logger.error("Error in login user helper>>", { error: error?.message });
    throw new Error(error);
  }
}

module.exports = { registerUser, loginUser };

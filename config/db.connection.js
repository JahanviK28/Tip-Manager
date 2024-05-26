const mongoose = require("mongoose");
const { logger } = require("./logger.config");
const { successMessage } = require("../enum/response-message.enum");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(successMessage.MONGODB_CONNECTION_SUCCESS);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

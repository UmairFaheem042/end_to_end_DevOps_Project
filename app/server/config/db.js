const mongoose = require("mongoose");
const { mongoConnectionStatus } = require("../metrics/metrics");
// const logger = require("../utils/logger");
const logger = require("../logger/splunkLogger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // ✅ SET IMMEDIATELY (CRITICAL FIX)
    mongoConnectionStatus.set(1);
    logger.info({ message: "MongoDB connected" });

    // Still keep listeners for future changes
    mongoose.connection.on("disconnected", () => {
      mongoConnectionStatus.set(0);
      logger.warn({ message: "MongoDB disconnected" });
    });

    mongoose.connection.on("error", (error) => {
      mongoConnectionStatus.set(0);
      logger.error({
        message: "MongoDB connection error",
        error
      });
    });

  } catch (error) {
    mongoConnectionStatus.set(0);
    logger.error({
      message: "Unable to connect to Database",
      error
    });
    process.exit(1);
  }
};

module.exports = connectDB;

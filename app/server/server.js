const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.route");
const transactionRoutes = require("./routes/transaction.route");
const categoryRoutes = require("./routes/category.route");
const cardRoutes = require("./routes/card.route");
const healthCheckRoutes = require("./routes/healthChecks.route.js");
const metricRoutes = require("./routes/metric.route");

const { httpRequestDuration, httpRequestTotal, mongoConnectionStatus } = require("./metrics/metrics");

const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
// const logger = require('./utils/logger');
const logger = require('./logger/splunkLogger');
logger.info("🔥 BOOT LOG FROM BACKEND");
logger.info("🚀 Backend boot log to Splunk");


app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


// LOGGING
app.use((req, res, next) => {
  req.requestId = uuidv4();
  next();
});

app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  })
);

// MONITORING
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    httpRequestTotal.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode
    })
    end({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode
    })
  });

  next();
});

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/category", categoryRoutes);
// app.use("/api/card", cardRoutes);
app.use("/api/health", healthCheckRoutes);
app.use("/api/metrics", metricRoutes);

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

connectDB();

app.listen(process.env.PORT, () => {
  // console.log("Server is listening");
  logger.info("Server is listening", { port: process.env.PORT });
});


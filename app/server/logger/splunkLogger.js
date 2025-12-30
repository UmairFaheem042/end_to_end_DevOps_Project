const winston = require("winston");
const Transport = require("winston-transport");
const { Logger: SplunkLogger } = require("splunk-logging");

/**
 * Create Splunk HEC logger
 */
const splunkLogger = new SplunkLogger({
  token: process.env.SPLUNK_HEC_TOKEN,
  url: "http://splunk:8088/services/collector",
  index: "main",
  sourcetype: "cashflow-backend"
});

/**
 * Custom Winston transport for Splunk
 */
class SplunkTransport extends Transport {
  log(info, callback) {
    setImmediate(() => this.emit("logged", info));

    splunkLogger.send(
      {
        message: info.message, // REQUIRED
        level: info.level,
        service: "cashflow-backend",
        timestamp: info.timestamp,
        meta: info,
      },
      (err) => {
        if (err) {
          console.error("❌ Splunk HEC send failed:", err);
        }
      }
    );

    callback(); // REQUIRED
  }
}

/**
 * Winston logger instance
 */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new SplunkTransport()
  ]
});

module.exports = logger;

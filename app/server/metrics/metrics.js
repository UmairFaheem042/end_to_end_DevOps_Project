const client = require("prom-client");

client.collectDefaultMetrics();

const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5],
});

const httpRequestTotal = new client.Counter({
    name: "http_request_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
});

const mongoConnectionStatus = new client.Gauge({
    name: "mongo_connection_status",
    help: "MongoDB connection status (1 = connected, 0 = disconnected)"
});

module.exports = {
    client,
    httpRequestDuration,
    httpRequestTotal,
    mongoConnectionStatus
};

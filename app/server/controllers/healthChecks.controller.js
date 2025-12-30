const mongoose = require("mongoose");

exports.healthCheck = (req, res) => {
    res.status(200).json({
        status: "UP",
        service: "cashflow-backend",
        timestamp: new Date().toISOString()
    });
};

exports.dbHealthCheck = async (req, res) => {
    const dbState = mongoose.connection.readyState;

    if (dbState === 1) {
        return res.status(200).json({
            status: "UP",
            db: "CONNECTED",
            timestamp: new Date().toISOString()
        });
    } else {
        return res.status(503).json({
            status: "DOWN",
            db: "DISCONNECTED",
            timestamp: new Date().toISOString()
        });
    }
}

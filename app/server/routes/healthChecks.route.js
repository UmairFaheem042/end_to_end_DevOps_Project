const express = require("express");
const router = express.Router();
const { healthCheck, dbHealthCheck } = require("../controllers/healthChecks.controller.js");


router.get("/", healthCheck);

router.get("/db", dbHealthCheck);

module.exports = router;

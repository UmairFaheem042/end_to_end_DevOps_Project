const express = require("express");
const { client } = require("../metrics/metrics");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics(); // ✅ CALL FUNCTION
    res.end(metrics);
  } catch (err) {
    res.status(500).end(err.message);
  }
});

module.exports = router;

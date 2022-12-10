module.exports = app => {
    const mqtt = require("../controllers/mqtt.controller.js");
    const router = require("express").Router();
    // Send message in topic mqtt
    router.post("/", mqtt.create);

    app.use('/api/mqtt', router);
  };
  
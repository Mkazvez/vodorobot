module.exports = app => {
    const captchabacks = require("../controllers/captchaback.controller.js");
  
    var router = require("express").Router();

    router.post("/", captchabacks.captchasend);
  
    app.use('/api/captchabacks', router);
  };
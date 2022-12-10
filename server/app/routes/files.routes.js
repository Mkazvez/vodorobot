module.exports = app => {
    const files = require("../controllers/files.controller.js");
  
    var router = require("express").Router();
  
    router.get("/pki-validation/:name", files.downloadOne);
  
    app.use('/.well-known', router);
  };
  
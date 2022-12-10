module.exports = app => {
    const documenthouses = require("../controllers/documenthouse.controller.js");
  
    var router = require("express").Router();
  
    // Create a new 
    router.post("/", documenthouses.create);

    // Retrieve all 
    router.get("/", documenthouses.findAll);

    // router.post("/upload/:id", documenthouses.upload);
    router.post("/upload", documenthouses.upload);
    router.post("/saveupload", documenthouses.saveupload);
 
    router.get("/download/:id", documenthouses.downloadOne);
    router.get("/show/:id", documenthouses.show);
    // Retrieve a single 
    router.get("/:id", documenthouses.findOne);
  
    // Update a with id
    router.put("/:id", documenthouses.update);
  
    // Delete a with id
    router.delete("/:id", documenthouses.delete);
  
    // Delete all 
    router.delete("/", documenthouses.deleteAll);
  
    app.use('/api/documenthouses', router);
  };
  
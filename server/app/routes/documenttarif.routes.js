module.exports = app => {
    const documenttarif = require("../controllers/documenttarif.controller.js");
  
    var router = require("express").Router();
  
    // Create a new 
    router.post("/", documenttarif.create);

    // Retrieve all 
    router.get("/", documenttarif.findAll);

    // router.post("/upload/:id", documenttarif.upload);
    router.post("/upload", documenttarif.upload);
    router.post("/saveupload", documenttarif.saveupload);
 
    router.get("/download/:id", documenttarif.downloadOne);
    router.get("/show/:id", documenttarif.show);
    // Retrieve a single 
    router.get("/:id", documenttarif.findOne);
  
    // Update a with id
    router.put("/:id", documenttarif.update);
  
    // Delete a with id
    router.delete("/:id", documenttarif.delete);
  
    // Delete all 
    router.delete("/", documenttarif.deleteAll);
  
    app.use('/api/documenttarifs', router);
  };
  
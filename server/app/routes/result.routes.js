module.exports = app => {
    const results = require("../controllers/result.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", results.create);
  
    router.post("/upload", results.upload);
    
    // Retrieve all Tutorials
    router.get("/", results.findAll);
  
    // Retrieve all published Tutorials
    router.get("/fio", results.findAllTabel);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", results.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", results.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", results.delete);
  
    // Delete all Tutorials
    router.delete("/", results.deleteAll);
  
    app.use('/api/results', router);
  };
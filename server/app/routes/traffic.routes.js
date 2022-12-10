module.exports = app => {
    const Traffic = require("../controllers/traffic.controller.js");
  
    var router = require("express").Router();
  
    // Create a new record    
    router.post("/", Traffic.create);

    // Retrieve all records
    router.get("/", Traffic.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Traffic.findOne);
  
    // Update a record with id
    router.put("/:id", Traffic.update);
  
    // Delete a record with id
    router.delete("/:id", Traffic.delete);
  
    // Delete all records
    router.delete("/", Traffic.deleteAll);
  
    app.use('/api/traffic', router);
  };

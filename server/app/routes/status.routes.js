module.exports = app => {
    const Status = require("../controllers/status.controller.js");
  
    var router = require("express").Router();
  
    // Create a new record    
    router.post("/", Status.create);

    // Retrieve all records
    router.get("/", Status.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Status.findOne);
  
    // Update a record with id
    router.put("/:id", Status.update);
  
    // Delete a record with id
    router.delete("/:id", Status.delete);
  
    // Delete all records
    router.delete("/", Status.deleteAll);
  
    app.use('/api/status', router);
  };

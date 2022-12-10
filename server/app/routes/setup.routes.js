module.exports = app => {
    const Setup = require("../controllers/setup.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Setup.create);

    // Retrieve all records
    router.get("/", Setup.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Setup.findOne);
  
    // Update a record with id
    router.put("/:id", Setup.update);
  
    // Delete a record with id
    router.delete("/:id", Setup.delete);
  
    // Delete all records
    router.delete("/", Setup.deleteAll);
  
    app.use('/api/setup', router);
  };

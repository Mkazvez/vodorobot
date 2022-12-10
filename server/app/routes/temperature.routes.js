module.exports = app => {
    const Temperature = require("../controllers/temperature.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Temperature.create);

    // Retrieve all records
    router.get("/", Temperature.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Temperature.findOne);
  
    // Update a record with id
    router.put("/:id", Temperature.update);
  
    // Delete a record with id
    router.delete("/:id", Temperature.delete);
  
    // Delete all records
    router.delete("/", Temperature.deleteAll);
  
    app.use('/api/temperature', router);
  };

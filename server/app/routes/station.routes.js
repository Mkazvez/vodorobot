module.exports = app => {
    const Station = require("../controllers/station.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Station.create);

    // Retrieve all records
    router.get("/", Station.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Station.findOne);
  
    // Update a record with id
    router.put("/:id", Station.update);
  
    // Delete a record with id
    router.delete("/:id", Station.delete);
  
    // Delete all records
    router.delete("/", Station.deleteAll);
  
    app.use('/api/station', router);
  };

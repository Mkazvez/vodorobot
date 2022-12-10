module.exports = app => {
    const Maintenance = require("../controllers/maintenance.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Maintenance.create);

    // Retrieve all records
    router.get("/", Maintenance.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Maintenance.findOne);
  
    // Update a record with id
    router.put("/:id", Maintenance.update);
  
    // Delete a record with id
    router.delete("/:id", Maintenance.delete);
  
    // Delete all records
    router.delete("/", Maintenance.deleteAll);
  
    app.use('/api/maintenance', router);
  };

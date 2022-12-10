module.exports = app => {
    const Tips = require("../controllers/tips.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Tips.create);

    // Retrieve all records
    router.get("/", Tips.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Tips.findOne);
  
    // Update a record with id
    router.put("/:id", Tips.update);
  
    // Delete a record with id
    router.delete("/:id", Tips.delete);
  
    // Delete all records
    router.delete("/", Tips.deleteAll);
  
    app.use('/api/tips', router);
  };

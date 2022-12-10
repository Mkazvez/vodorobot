module.exports = app => {
    const Collection = require("../controllers/collection.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Collection.create);

    // Retrieve all records
    router.get("/", Collection.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Collection.findOne);
  
    // Update a record with id
    router.put("/:id", Collection.update);
  
    // Delete a record with id
    router.delete("/:id", Collection.delete);
  
    // Delete all records
    router.delete("/", Collection.deleteAll);
  
    app.use('/api/collection', router);
  };

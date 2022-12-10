module.exports = app => {
    const Ikey = require("../controllers/ikey.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Ikey.create);

    // Retrieve all records
    router.get("/", Ikey.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Ikey.findOne);
  
    // Update a record with id
    router.put("/:id", Ikey.update);
  
    // Delete a record with id
    router.delete("/:id", Ikey.delete);
  
    // Delete all records
    router.delete("/", Ikey.deleteAll);
  
    app.use('/api/ikey', router);
  };

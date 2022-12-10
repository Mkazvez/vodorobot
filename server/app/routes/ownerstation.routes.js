module.exports = app => {
    const Ownerstation = require("../controllers/ownerstation.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Ownerstation.create);

    // Retrieve all records
    router.get("/", Ownerstation.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Ownerstation.findOne);
  
    // Update a record with id
    router.put("/:id", Ownerstation.update);
  
    // Delete a record with id
    router.delete("/:id", Ownerstation.delete);
  
    // Delete all records
    router.delete("/", Ownerstation.deleteAll);
  
    app.use('/api/ownerstation', router);
  };

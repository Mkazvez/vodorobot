module.exports = app => {
    const Buyer = require("../controllers/buyer.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Buyer.create);

    // Retrieve all records
    router.get("/", Buyer.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Buyer.findOne);
  
    // Update a record with id
    router.put("/:id", Buyer.update);
  
    // Delete a record with id
    router.delete("/:id", Buyer.delete);
  
    // Delete all records
    router.delete("/", Buyer.deleteAll);
  
    app.use('/api/buyer', router);
  };

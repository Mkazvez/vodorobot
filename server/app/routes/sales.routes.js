module.exports = app => {
    const Sales = require("../controllers/sales.controller.js");
  
    var router = require("express").Router();
  
    // Create a new record    
    router.post("/", Sales.create);

    // Retrieve all records
    router.get("/", Sales.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Sales.findOne);
  
    // Update a record with id
    router.put("/:id", Sales.update);
  
    // Delete a record with id
    router.delete("/:id", Sales.delete);
  
    // Delete all records
    router.delete("/", Sales.deleteAll);
  
    app.use('/api/sales', router);
  };

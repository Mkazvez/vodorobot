module.exports = app => {
    const reportgenerals = require("../controllers/reportgeneral.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", reportgenerals.create);
  
    // Retrieve all Tutorials
    router.get("/", reportgenerals.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", reportgenerals.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", reportgenerals.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", reportgenerals.delete);
  
    // Delete all Tutorials
    router.delete("/", reportgenerals.deleteAll);
  
    app.use('/api/reportgenerals', router);
  };
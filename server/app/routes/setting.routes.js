module.exports = app => {
    const Setting = require("../controllers/setting.controller.js");
  
    let router = require("express").Router();
  
    // Create a new record    
    router.post("/", Setting.create);

    // Retrieve all records
    router.get("/", Setting.findAll);
  
    // Retrieve a single record with id
    router.get("/:id", Setting.findOne);
  
    // Update a record with id
    router.put("/:id", Setting.update);
  
    // Delete a record with id
    router.delete("/:id", Setting.delete);
  
    // Delete all records
    router.delete("/", Setting.deleteAll);
  
    app.use('/api/Setting', router);
  };

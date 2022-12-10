module.exports = app => {
    const objects = require("../controllers/object.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Object
    router.post("/", objects.create);

    // Retrieve all Objects
    router.get("/", objects.findAll);
  
    // Retrieve all published Objects
    router.get("/adres", objects.findAllObject);
  
    // Retrieve a single Object with id
    router.get("/:id", objects.findOne);
  
    // Update a Object with id
    router.put("/:id", objects.update);
  
    // Delete a Object with id
    router.delete("/:id", objects.delete);
  
    // Delete all Objects
    router.delete("/", objects.deleteAll);
  
    app.use('/api/objects', router);
  };
  
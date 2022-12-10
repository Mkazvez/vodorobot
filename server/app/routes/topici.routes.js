module.exports = app => {
    const topicis = require("../controllers/topici.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Topici
    router.post("/", topicis.create);
  
    // Retrieve all Topici
    router.get("/", topicis.findAll);
  
    // Retrieve a single Topici with id
    router.get("/:id", topicis.findOne);
  
    // Update a Topici with id
    router.put("/:id", topicis.update);
  
    // Delete a Topici with id
    router.delete("/:id", topicis.delete);
  
    // Delete all Topici
    router.delete("/", topicis.deleteAll);
  
    app.use('/api/topicis', router);
  };
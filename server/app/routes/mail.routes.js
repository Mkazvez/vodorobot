module.exports = app => {
    const mails = require("../controllers/mail.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Email    
    router.post("/", mails.create);

    // Retrieve all Emails
    router.get("/", mails.findAll);
  
    // Retrieve all published Emails
    router.get("/email", mails.findAllEmail);
  
    // Retrieve a single Email with id
    router.get("/:id", mails.findOne);
  
    // Update a Email with id
    router.put("/:id", mails.update);
  
    // Delete a Email with id
    router.delete("/:id", mails.delete);
  
    // Delete all Emails
    router.delete("/", mails.deleteAll);

    router.post("/upload", mails.upload);
  
    app.use('/api/mails', router);
  };

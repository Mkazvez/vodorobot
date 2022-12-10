module.exports = app => {
    const newss = require("../controllers/news.controller.js");
  
    var router = require("express").Router();
  
    // Create a new 
    router.post("/", newss.create);

    // Retrieve all 
    router.get("/", newss.findAll);

    router.get("/top4", newss.findTop4);


    router.post("/upload", newss.upload);
    router.post("/uploadDoc", newss.uploadDoc);
 
    // router.post("/saveupload", newss.saveupload);
 
    router.get("/download/:id", newss.downloadOne);
    router.get("/show/:id", newss.show);
    router.get("/downloadDoc/:id", newss.downloadOneDoc);
    router.get("/showDoc/:id", newss.showDoc);
    // Retrieve a single 
    router.get("/:id", newss.findOne);
  

    // Update a with id
    router.put("/:id", newss.update);
  
    // Delete a with id
    router.delete("/:id", newss.delete);
  
    // Delete all 
    router.delete("/", newss.deleteAll);
  
    app.use('/api/newss', router);
  };
  
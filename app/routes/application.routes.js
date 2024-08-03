module.exports = (app) => {
    const application = require("../controllers/application.controller.js");
    const { authenticate } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new application
    router.post("/", [authenticate], application.create);
    // Retrieve all applications
    router.get("/", [authenticate], application.findAll);
    // Retrieve a single application with id
    router.get("/:id", [authenticate], application.findById);
    // Update a application with id
    router.put("/:id", [authenticate], application.update);
    // Delete a application with id
    router.delete("/:id", [authenticate], application.delete);
    // Delete all applications
    router.delete("/", [authenticate], application.deleteAll);
  
    app.use("/oneapp-api/applications", router);
  };
  
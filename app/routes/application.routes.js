module.exports = (app) => {
    const application = require("../controllers/application.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new application
    router.post("/", [authenticateRoute], application.create);
    // Retrieve all applications
    router.get("/", [authenticateRoute], application.findAll);
    // Retrieve a single application with id
    router.get("/:id", [authenticateRoute], application.findById);
    // Retrieve all applications with userId
    router.get("/user/:userId", [authenticateRoute], application.findbyUserId);

    // Retrieve all applications and data with formId since datea
    router.get("/form/:formId/date/:date", [authenticateRoute], application.findAllbyFormDate);

    // Update a application with id
    router.put("/:id", [authenticateRoute], application.update);
    // Delete a application with id
    router.delete("/:id", [authenticateRoute], application.delete);
    // Delete all applications
    router.delete("/", [authenticateRoute], application.deleteAll);
  
    app.use("/oneapp-api/applications", router);
  };
  
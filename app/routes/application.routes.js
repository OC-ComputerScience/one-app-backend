module.exports = (app) => {
    const application = require("../controllers/application.controller.js");
    const { authenticateRoute,isAdminOrUniversity,isAdminOrId,isAdminOrAppId } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new application
    router.post("/", [authenticateRoute,isAdminOrId], application.create);
    // Retrieve all applications
    router.get("/", [authenticateRoute,isAdmin], application.findAll);
    // Retrieve a single application with id
    router.get("/:id", [authenticateRoute,isAdminOrAppId], application.findById);
    // Retrieve all applications with userId
    router.get("/user/:id", [authenticateRoute,isAdminOrId], application.findbyUserId);

    // Retrieve all applications and data with formId since datea
    router.get("/form/:formId/date/:date", [authenticateRoute,isAdminOrUniversity], application.findAllbyFormDate);

    // Update a application with id
    router.put("/:id", [authenticateRoute,isAdminOrAppId], application.update);
    // Delete a application with id
    router.delete("/:id", [authenticateRoute,isAdminOrAppId], application.delete);

  
    app.use("/oneapp-api/applications", router);
  };
  
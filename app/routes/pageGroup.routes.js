module.exports = (app) => {
    const pageGroup = require("../controllers/pageGroup.controller.js");
    const { authenticateRoute,isAdmin } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new pageGroup
    router.post("/", [authenticateRoute,isAdmin], pageGroup.create);
    // Retrieve all pageGroups
    router.get("/", [authenticateRoute], pageGroup.findAll);
    // Retrieve a single pageGroup with id
    router.get("/:id", [authenticateRoute], pageGroup.findById);
    // Update a pageGroup with id
    router.put("/:id", [authenticateRoute,isAdmin], pageGroup.update);
    // Delete a pageGroup with id
    router.delete("/:id", [authenticateRoute,isAdmin], pageGroup.delete);

  
    app.use("/oneapp-api/pageGroups", router);
  };
  
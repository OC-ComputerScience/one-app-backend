module.exports = (app) => {
    const pageGroup = require("../controllers/pageGroup.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new pageGroup
    router.post("/", [authenticateRoute], pageGroup.create);
    // Retrieve all pageGroups
    router.get("/", [authenticateRoute], pageGroup.findAll);
    // Retrieve a single pageGroup with id
    router.get("/:id", [authenticateRoute], pageGroup.findById);
    // Update a pageGroup with id
    router.put("/:id", [authenticateRoute], pageGroup.update);
    // Delete a pageGroup with id
    router.delete("/:id", [authenticateRoute], pageGroup.delete);
    // Delete all pageGroups
    router.delete("/", [authenticateRoute], pageGroup.deleteAll);
  
    app.use("/oneapp-api/pageGroups", router);
  };
  
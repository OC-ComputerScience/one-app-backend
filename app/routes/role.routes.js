module.exports = (app) => {
    const role = require("../controllers/role.controller.js");
    const { authenticateRoute,isAdmin } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new role
    router.post("/", [authenticateRoute,isAdmin], role.create);
    // Retrieve all roles
    router.get("/", role.findAll);
    // Retrieve a single role with id
    router.get("/:id", [authenticateRoute], role.findById);
    // Update a role with id
    router.put("/:id", [authenticateRoute,isAdmin], role.update);
    // Delete a role with id
    router.delete("/:id", [authenticateRoute,isAdmin], role.delete);
  
    app.use("/oneapp-api/roles", router);
  };
  
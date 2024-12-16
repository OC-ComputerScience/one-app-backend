module.exports = (app) => {
    const role = require("../controllers/role.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new role
    router.post("/", [authenticateRoute], role.create);
    // Retrieve all roles
    router.get("/", role.findAll);
    // Retrieve a single role with id
    router.get("/:id", [authenticateRoute], role.findById);
    // Update a role with id
    router.put("/:id", [authenticateRoute], role.update);
    // Delete a role with id
    router.delete("/:id", [authenticateRoute], role.delete);
    // Delete all roles
    router.delete("/", [authenticateRoute], role.deleteAll);
  
    app.use("/oneapp-api/roles", router);
  };
  
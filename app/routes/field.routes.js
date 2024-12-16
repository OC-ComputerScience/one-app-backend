module.exports = (app) => {
    const field = require("../controllers/field.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new field
    router.post("/", [authenticateRoute], field.create);
    // Retrieve all fields
    router.get("/", [authenticateRoute], field.findAll);
    // Retrieve a single field with id
    router.get("/:id", [authenticateRoute], field.findById);
    // Update a field with id
    router.put("/:id", [authenticateRoute], field.update);
    // Delete a field with id
    router.delete("/:id", [authenticateRoute], field.delete);
    // Delete all fields
    router.delete("/", [authenticateRoute], field.deleteAll);
  
    app.use("/oneapp-api/fields", router);
  };
  
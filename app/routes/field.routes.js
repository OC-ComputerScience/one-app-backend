module.exports = (app) => {
    const field = require("../controllers/field.controller.js");
    const { authenticateRoute,isAdmin } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new field
    router.post("/", [authenticateRoute,isAdmin], field.create);
    // Retrieve all fields
    router.get("/", [authenticateRoute], field.findAll);
    // Retrieve a single field with id
    router.get("/:id", [authenticateRoute], field.findById);
    // Update a field with id
    router.put("/:id", [authenticateRoute,isAdmin], field.update);
    // Delete a field with id
    router.delete("/:id", [authenticateRoute,isAdmin], field.delete);
  
  
    app.use("/oneapp-api/fields", router);
  };
  
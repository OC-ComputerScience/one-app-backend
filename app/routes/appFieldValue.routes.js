module.exports = (app) => {
    const appFieldValue = require("../controllers/appFieldValue.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new appFieldValue
    router.post("/", [authenticateRoute], appFieldValue.create);
    // Retrieve all appFieldValues
    router.get("/", [authenticateRoute], appFieldValue.findAll);
    // Retrieve a single appFieldValue with id
    router.get("/:id", [authenticateRoute], appFieldValue.findById);
    // Update a appFieldValue with id
    router.put("/:id", [authenticateRoute], appFieldValue.update);
    // Delete a appFieldValue with id
    router.delete("/:id", [authenticateRoute], appFieldValue.delete);
    // Delete all appFieldValues
    router.delete("/", [authenticateRoute], appFieldValue.deleteAll);
  
    app.use("/oneapp-api/appFieldValues", router);
  };
  
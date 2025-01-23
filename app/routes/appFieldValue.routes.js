module.exports = (app) => {
    const appFieldValue = require("../controllers/appFieldValue.controller.js");
    const { authenticateRoute, isAdmin } = require("../authentication/authentication.js");
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
    // Delete a appFieldValue with id
    router.delete("/:fieldId/app/:applicationId/set/:setNumber", [authenticateRoute], appFieldValue.deleteFieldValuesForAppSet);

  
    app.use("/oneapp-api/appFieldValues", router);
  };
  
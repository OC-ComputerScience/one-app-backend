module.exports = (app) => {
    const fieldValue = require("../controllers/fieldValue.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new fieldValue
    router.post("/", [authenticateRoute], fieldValue.create);
    // Retrieve all fieldValues
    router.get("/", [authenticateRoute], fieldValue.findAll);
    // Retrieve a single fieldValue with id
    router.get("/:id", [authenticateRoute], fieldValue.findById);

    router.get("/field/:fieldId", [authenticateRoute], fieldValue.findAllByField);
    // Update a fieldValue with id
    router.put("/:id", [authenticateRoute], fieldValue.update);
    // Delete a fieldValue with id
    router.delete("/:id", [authenticateRoute], fieldValue.delete);
    // Delete all fieldValues
    router.delete("/", [authenticateRoute], fieldValue.deleteAll);
  
    app.use("/oneapp-api/fieldValues", router);
  };
  
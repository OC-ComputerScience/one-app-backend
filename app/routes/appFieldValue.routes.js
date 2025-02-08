module.exports = (app) => {
    const appFieldValue = require("../controllers/appFieldValue.controller.js");
    const { authenticateRoute,isAdminOrAppId } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new appFieldValue
    router.post("/", [authenticateRoute,isAdminOrAppId], appFieldValue.create);
    // Retrieve all appFieldValues
    router.get("/", [authenticateRoute,isAdmin], appFieldValue.findAll);
    // Retrieve a single appFieldValue with id
    router.get("/:id", [authenticateRoute,isAdmin], appFieldValue.findById);
    // Update a appFieldValue with id
    router.put("/:id", [authenticateRoute,isAdminOrAppId], appFieldValue.update);
    // Delete a appFieldValue with id
    router.delete("/:id", [authenticateRoute,isAdminOrAppId], appFieldValue.delete);
    // Delete a appFieldValue with id
    router.delete("/:fieldId/app/:id/set/:setNumber", [authenticateRoute,isAdminOrAppId], appFieldValue.deleteFieldValuesForAppSet);

  
    app.use("/oneapp-api/appFieldValues", router);
  };
  
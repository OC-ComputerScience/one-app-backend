module.exports = (app) => {
    const appFieldValue = require("../controllers/appFieldValue.controller.js");
    const { authenticate } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new appFieldValue
    router.post("/", [authenticate], appFieldValue.create);
    // Retrieve all appFieldValues
    router.get("/", [authenticate], appFieldValue.findAll);
    // Retrieve a single appFieldValue with id
    router.get("/:id", [authenticate], appFieldValue.findById);
    // Update a appFieldValue with id
    router.put("/:id", [authenticate], appFieldValue.update);
    // Delete a appFieldValue with id
    router.delete("/:id", [authenticate], appFieldValue.delete);
    // Delete all appFieldValues
    router.delete("/", [authenticate], appFieldValue.deleteAll);
  
    app.use("/oneapp-api/appFieldValues", router);
  };
  
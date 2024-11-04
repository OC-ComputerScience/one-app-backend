module.exports = (app) => {
    const field = require("../controllers/field.controller.js");
    const { authenticate } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new field
    router.post("/", [authenticate], field.create);
    // Retrieve all fields
    router.get("/", [authenticate], field.findAll);
    // Retrieve a single field with id
    router.get("/:id", [authenticate], field.findById);
    // Update a field with id
    router.put("/:id", [authenticate], field.update);
    // Delete a field with id
    router.delete("/:id", [authenticate], field.delete);
    // Delete all fields
    router.delete("/", [authenticate], field.deleteAll);
  
    app.use("/oneapp-api/fields", router);
  };
  
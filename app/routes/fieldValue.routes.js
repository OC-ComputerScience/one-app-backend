module.exports = (app) => {
    const fieldValue = require("../controllers/fieldValue.controller.js");
    const { authenticate } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new fieldValue
    router.post("/", [authenticate], fieldValue.create);
    // Retrieve all fieldValues
    router.get("/", [authenticate], fieldValue.findAll);
    // Retrieve a single fieldValue with id
    router.get("/:id", [authenticate], fieldValue.findById);
    // Update a fieldValue with id
    router.put("/:id", [authenticate], fieldValue.update);
    // Delete a fieldValue with id
    router.delete("/:id", [authenticate], fieldValue.delete);
    // Delete all fieldValues
    router.delete("/", [authenticate], fieldValue.deleteAll);
  
    app.use("/oneapp-api/fieldValues", router);
  };
  
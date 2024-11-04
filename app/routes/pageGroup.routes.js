module.exports = (app) => {
    const pageGroup = require("../controllers/pageGroup.controller.js");
    const { authenticate } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new pageGroup
    router.post("/", [authenticate], pageGroup.create);
    // Retrieve all pageGroups
    router.get("/", [authenticate], pageGroup.findAll);
    // Retrieve a single pageGroup with id
    router.get("/:id", [authenticate], pageGroup.findById);
    // Update a pageGroup with id
    router.put("/:id", [authenticate], pageGroup.update);
    // Delete a pageGroup with id
    router.delete("/:id", [authenticate], pageGroup.delete);
    // Delete all pageGroups
    router.delete("/", [authenticate], pageGroup.deleteAll);
  
    app.use("/oneapp-api/pageGroups", router);
  };
  
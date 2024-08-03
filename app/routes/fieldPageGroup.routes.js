module.exports = (app) => {
    const fieldPageGroup = require("../controllers/fieldPageGroup.controller.js");
    const { authenticate } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new Field Page Group
    router.post("/", [authenticate], fieldPageGroup.create);
    // Retrieve all Field Page Groups
    router.get("/", [authenticate], fieldPageGroup.findAll);
    // Retrieve a single Field Page Group with id
    router.get("/:id", [authenticate], fieldPageGroup.findById);
    // Update a Field Page Group with id
    router.put("/:id", [authenticate], fieldPageGroup.update);
    // Delete a Field Page Group with id
    router.delete("/:id", [authenticate], fieldPageGroup.delete);
    // Delete all Field Page Groups
    router.delete("/", [authenticate], fieldPageGroup.deleteAll);
  
    app.use("/oneapp-api/fieldPageGroups", router);
  };
  
module.exports = (app) => {
    const fieldPageGroup = require("../controllers/fieldPageGroup.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new Field Page Group
    router.post("/", [authenticateRoute], fieldPageGroup.create);
    // Retrieve all Field Page Groups
    router.get("/", [authenticateRoute], fieldPageGroup.findAll);
    // Retrieve a single Field Page Group with id
    router.get("/:id", [authenticateRoute], fieldPageGroup.findById);
    // Update a Field Page Group with id
    router.put("/:id", [authenticateRoute], fieldPageGroup.update);
    // Delete a Field Page Group with id
    router.delete("/:id", [authenticateRoute], fieldPageGroup.delete);
    // Delete all Field Page Groups
    router.delete("/", [authenticateRoute], fieldPageGroup.deleteAll);
  
    app.use("/oneapp-api/fieldPageGroups", router);
  };
  
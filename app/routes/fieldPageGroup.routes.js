module.exports = (app) => {
    const fieldPageGroup = require("../controllers/fieldPageGroup.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new Field Page Group
    router.post("/", [authenticateRoute,isAdmin], fieldPageGroup.create);
    // Retrieve all Field Page Groups
    router.get("/", [authenticateRoute], fieldPageGroup.findAll);
    // Retrieve a single Field Page Group with id
    router.get("/:id", [authenticateRoute], fieldPageGroup.findById);
    // Update a Field Page Group with id
    router.put("/:id", [authenticateRoute,isAdmin], fieldPageGroup.update);
    // Delete a Field Page Group with id
    router.delete("/:id", [authenticateRoute],isAdmin, fieldPageGroup.delete);
 

  
    app.use("/oneapp-api/fieldPageGroups", router);
  };
  
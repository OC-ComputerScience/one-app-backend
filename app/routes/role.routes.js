module.exports = (app) => {
    const role = require("../controllers/role.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new role
    router.post("/", [authenticate], role.create);
    // Retrieve all roles
    router.get("/", [authenticate], role.findAll);
    // Retrieve a single role with id
    router.get("/:id", [authenticate], role.findById);
    // Update a role with id
    router.put("/:id", [authenticate], role.update);
    // Delete a role with id
    router.delete("/:id", [authenticate], role.delete);
    // Delete all roles
    router.delete("/", [authenticate], role.deleteAll);
  
    app.use("/oneapp-api/role", router);
  };
  
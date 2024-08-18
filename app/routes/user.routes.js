module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticate } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new User
  router.post("/", [authenticate], user.create);

  // Retrieve all Users
  router.get("/", [authenticate], user.findAll);

  // Retrieve a single User with id
  router.get("/:id", [authenticate], user.findById);

  // Update a User with id
  router.put("/:id", [authenticate], user.update);

  // Delete a User with id
  router.delete("/:id", [authenticate], user.delete);

  // Delete all User
  router.delete("/", [authenticate], user.deleteAll);

  app.use("/oneapp-api/users", router);
};

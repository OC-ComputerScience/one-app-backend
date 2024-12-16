module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new User
  router.post("/", user.create);

  // Retrieve all Users
  router.get("/", [authenticateRoute], user.findAll);

  // Retrieve a single User with id
  router.get("/:id", user.findById);

  // Update a User with id
  router.put("/:id", [authenticateRoute], user.update);

  // Delete a User with id
  router.delete("/:id", [authenticateRoute], user.delete);

  // Delete all User
  router.delete("/", [authenticateRoute], user.deleteAll);

  app.use("/oneapp-api/users", router);
};

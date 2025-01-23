module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticateRoute,isAdmin } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new User
  router.post("/", user.create);

  // Retrieve all Users
  router.get("/", [authenticateRoute,isAdmin], user.findAll);

  // Retrieve a single User with id
  router.get("/:id", user.findById);

  // Update a User with id
  router.put("/:id", [authenticateRoute,isAdmin], user.update);

  // Delete a User with id
  router.delete("/:id", [authenticateRoute,isAdmin], user.delete);



  app.use("/oneapp-api/users", router);
};

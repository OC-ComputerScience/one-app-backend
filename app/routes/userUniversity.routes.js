module.exports = (app) => {
  const userUniversity = require("../controllers/userUniversity.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new UserUniversity
  router.post("/", [authenticateRoute], userUniversity.create);

  // Retrieve all UserUniversity
  router.get("/", [authenticateRoute], userUniversity.findAll);

  // Retrieve a single UserUniversity with userUniversityId
  router.get("/:id", [authenticateRoute], userUniversity.findById);

  // Update an UserUniversity with userUniversityId
  router.put("/:id", [authenticateRoute], userUniversity.update);

  // Delete an UserUniversity with userUniversityId
  router.delete("/:id", [authenticateRoute], userUniversity.delete);

  // Create a new UserUniversity
  router.delete("/", [authenticateRoute], userUniversity.deleteAll);

  app.use("/oneapp-api/userUniversities", router);
};

module.exports = (app) => {
  const university = require("../controllers/university.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new UserUniversity
  router.post("/", [authenticateRoute], university.create);

  // Retrieve all UserUniversity
  router.get("/", [authenticateRoute], university.findAll);

  // Retrieve a single UserUniversity with universityId
  router.get("/:id", [authenticateRoute], university.findById);

  // Update an UserUniversity with universityId
  router.put("/:id", [authenticateRoute], university.update);

  // Delete an UserUniversity with universityId
  router.delete("/:id", [authenticateRoute], university.delete);

  // Create a new UserUniversity
  router.delete("/", [authenticateRoute], university.deleteAll);

  app.use("/oneapp-api/universities", router);
};

module.exports = (app) => {
  const university = require("../controllers/university.controller.js");
  var router = require("express").Router();
  const { authenticateRoute,isAdmin,isAdminOrTutor } = require("../authentication/authentication");

  // Create a new University
  router.post("/", [authenticateRoute,isAdmin], university.create);

  // Retrieve all University
  router.get("/", university.findAll);

  // Retrieve a single University with universityId
  router.get("/:id", [authenticateRoute], university.findById);

  // Update an University with universityId
  router.put("/:id", [authenticateRoute,isAdmin], university.update);

  // Delete an University with universityId
  router.delete("/:id", [authenticateRoute,isAdmin], university.delete);

  // Create a new University
  router.delete("/", [authenticateRoute,isAdmin], university.deleteAll);

  app.use("/oneapp-api/universities", router);
};

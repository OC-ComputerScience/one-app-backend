module.exports = (app) => {
  const userUniversity = require("../controllers/userUniversity.controller.js");
  var router = require("express").Router();
  const { authenticateRoute,isAdmin } = require("../authentication/authentication.js");

  // Create a new UserUniversity
  router.post("/", [authenticateRoute,isAdmin], userUniversity.create);

  // Retrieve all UserUniversity
  router.get("/", [authenticateRoute], userUniversity.findAll);

  // Retrieve a single UserUniversity with userUniversityId
  router.get("/:id", [authenticateRoute,isAdmin], userUniversity.findById);

  // Update an UserUniversity with userUniversityId
  router.put("/:id", [authenticateRoute,isAdmin], userUniversity.update);

  // Delete an UserUniversity with userUniversityId
  router.delete("/:id", [authenticateRoute,isAdmin], userUniversity.delete);



  app.use("/oneapp-api/userUniversities", router);
};

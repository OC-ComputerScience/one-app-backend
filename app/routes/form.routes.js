module.exports = (app) => {
  const form = require("../controllers/form.controller.js");
  var router = require("express").Router();
  const { authenticateRoute,isAdmin } = require("../authentication/authentication.js");

  // Create a new UserForm
  router.post("/", [authenticateRoute,isAdmin], form.create);

  // Retrieve all UserForm
  router.get("/", [authenticateRoute,isAdmin], form.findAll);

    // Retrieve main UserForm
    router.get("/main", [authenticateRoute], form.findMain);

  // Retrieve a single UserForm with formId
  router.get("/:id", [authenticateRoute,isAdmin], form.findById);

  // Update an UserForm with formId
  router.put("/:id", [authenticateRoute,isAdmin], form.update);

  // Delete an UserForm with formId
  router.delete("/:id", [authenticateRoute,isAdmin], form.delete);

  app.use("/oneapp-api/forms", router);
};

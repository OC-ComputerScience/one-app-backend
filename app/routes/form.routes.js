module.exports = (app) => {
  const form = require("../controllers/form.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new UserForm
  router.post("/", [authenticateRoute], form.create);

  // Retrieve all UserForm
  router.get("/", [authenticateRoute], form.findAll);

    // Retrieve all UserForm
    router.get("/main", [authenticateRoute], form.findMain);

  // Retrieve a single UserForm with formId
  router.get("/:id", [authenticateRoute], form.findById);

  // Update an UserForm with formId
  router.put("/:id", [authenticateRoute], form.update);

  // Delete an UserForm with formId
  router.delete("/:id", [authenticateRoute], form.delete);

  // Create a new UserForm
  router.delete("/", [authenticateRoute], form.deleteAll);

  app.use("/oneapp-api/forms", router);
};

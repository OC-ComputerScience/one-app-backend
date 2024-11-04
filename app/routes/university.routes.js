module.exports = (app) => {
  const university = require("../controllers/university.controller.js");
  var router = require("express").Router();
  const { authenticate } = require("../authentication/authentication.js");

  // Create a new UserUniversity
  router.post("/", [authenticate], university.create);

  // Retrieve all UserUniversity
  router.get("/", [authenticate], university.findAll);

  // Retrieve a single UserUniversity with universityId
  router.get("/:id", [authenticate], university.findById);

  // Update an UserUniversity with universityId
  router.put("/:id", [authenticate], university.update);

  // Delete an UserUniversity with universityId
  router.delete("/:id", [authenticate], university.delete);

  // Create a new UserUniversity
  router.delete("/", [authenticate], university.deleteAll);

  app.use("/oneapp-api/universities", router);
};

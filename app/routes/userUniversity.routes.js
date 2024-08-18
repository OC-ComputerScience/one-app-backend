module.exports = (app) => {
  const userUniversity = require("../controllers/userUniversity.controller.js");
  var router = require("express").Router();
  const { authenticate } = require("../authentication/authentication.js");

  // Create a new UserUniversity
  router.post("/", [authenticate], userUniversity.create);

  // Retrieve all UserUniversity
  router.get("/", [authenticate], userUniversity.findAll);

  // Retrieve a single UserUniversity with userUniversityId
  router.get("/:id", [authenticate], userUniversity.findById);

  // Update an UserUniversity with userUniversityId
  router.put("/:id", [authenticate], userUniversity.update);

  // Delete an UserUniversity with userUniversityId
  router.delete("/:id", [authenticate], userUniversity.delete);

  // Create a new UserUniversity
  router.delete("/", [authenticate], userUniversity.deleteAll);

  app.use("/oneapp-api/userUniversities", router);
};

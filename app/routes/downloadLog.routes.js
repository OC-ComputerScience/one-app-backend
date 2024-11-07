module.exports = (app) => {
  const downloadLog = require("../controllers/downloadLog.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new DownloadLog
  router.post("/", [authenticateRoute], downloadLog.create);

  // Retrieve all DownloadLog
  router.get("/", [authenticateRoute], downloadLog.findAll);

  // Retrieve a single DownloadLog with downloadLogId
  router.get("/:id", [authenticateRoute], downloadLog.findById);

  // Update an DownloadLog with downloadLogId
  router.put("/:id", [authenticateRoute], downloadLog.update);

  // Delete an DownloadLog with downloadLogId
  router.delete("/:id", [authenticateRoute], downloadLog.delete);

  // Create a new DownloadLog
  router.delete("/", [authenticateRoute], downloadLog.deleteAll);

  app.use("/oneapp-api/downloadLogs", router);
};

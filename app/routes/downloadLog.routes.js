module.exports = (app) => {
  const downloadLog = require("../controllers/downloadLog.controller.js");
  var router = require("express").Router();
  const { authenticateRoute,isAdmin,isAdminOrUniversity } = require("../authentication/authentication.js");

  // Create a new DownloadLog
  router.post("/", [authenticateRoute,isAdminOrUniversity], downloadLog.create);

  // Retrieve all DownloadLog
  router.get("/", [authenticateRoute,isAdmin], downloadLog.findAll);

  // Retrieve a single DownloadLog with downloadLogId
  router.get("/:id", [authenticateRoute,isAdmin], downloadLog.findById);

  // Update an DownloadLog with downloadLogId
  router.put("/:id", [authenticateRoute,isAdmin], downloadLog.update);

  // Delete an DownloadLog with downloadLogId
  router.delete("/:id", [authenticateRoute,isAdmin], downloadLog.delete);

  app.use("/oneapp-api/downloadLogs", router);
};

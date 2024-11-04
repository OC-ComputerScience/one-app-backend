module.exports = (app) => {
  const downloadLog = require("../controllers/downloadLog.controller.js");
  var router = require("express").Router();
  const { authenticate } = require("../authentication/authentication.js");

  // Create a new DownloadLog
  router.post("/", [authenticate], downloadLog.create);

  // Retrieve all DownloadLog
  router.get("/", [authenticate], downloadLog.findAll);

  // Retrieve a single DownloadLog with downloadLogId
  router.get("/:id", [authenticate], downloadLog.findById);

  // Update an DownloadLog with downloadLogId
  router.put("/:id", [authenticate], downloadLog.update);

  // Delete an DownloadLog with downloadLogId
  router.delete("/:id", [authenticate], downloadLog.delete);

  // Create a new DownloadLog
  router.delete("/", [authenticate], downloadLog.deleteAll);

  app.use("/oneapp-api/downloadLogs", router);
};

const db = require("../models");
const DownloadLog = db.downloadLog;
const Op = db.Sequelize.Op;

// Create and Save a new Download Log
exports.create = (req, res) => {
  // Validate request
  if (req.body.userId === undefined) {
    const error = new Error("User id cannot be empty for download log!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.universityId === undefined) {
    const error = new Error("University id cannot be empty for download log!");
    error.statusCode = 400;
    throw error;
  }

  // Create a DownloadLog
  const downloadLog = {
    fileName: req.body.fileName,
    dateTime: req.body.dateTime,
    userId: req.body.userId,
    universityId: req.body.universityId,
  };
  // Save DownloadLog in the database
  DownloadLog.create(downloadLog)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Download Log.",
      });
    });
};

// Retrieve all DownloadLogs from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  DownloadLog.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving download logs.",
      });
    });
};

// Find a single DownloadLog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DownloadLog.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving DownloadLog with id=" + id,
      });
    });
};

// Update a DownloadLog by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DownloadLog.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "DownloadLog was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update DownloadLog with id=${id}. Maybe DownloadLog was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating DownloadLog with id=" + id,
      });
    });
};

// Delete a DownloadLog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DownloadLog.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "DownloadLog was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete DownloadLog with id=${id}. Maybe DownloadLog was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete DownloadLog with id=" + id,
      });
    });
};

// Delete all DownloadLogs from the database.
exports.deleteAll = (req, res) => {
  DownloadLog.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} DownloadLogs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all DownloadLogs.",
      });
    });
};

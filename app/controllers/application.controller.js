const db = require("../models");
const Application = db.application;
const Op = db.Sequelize.Op;

// Create and Save a new Application
exports.create = (req, res) => {
  // Validate request
  if (req.body.userId === undefined) {
    const error = new Error("User id cannot be empty for application!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.status === undefined) {
    const error = new Error("Status cannot be empty for application!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Application
  const application = {
    status: req.body.status,
    userId: req.body.userId
  };
  // Save Application in the database
  Application.create(application)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Application.",
      });
    });
};

// Retrieve all DownloadLogs from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Application.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single Application with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  Application.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Application with id=" + id,
      });
    });
};

exports.findbyUserId = async (req, res) => {
  const id = req.params.userId;

  try {
    const data = await Application.findAll({ 
      where: { userId: id }
    });
    res.send(data);
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Application with user id=" + id,
    });
  }

};

// Update a Application by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Application.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Application was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Application with id=${id}. Maybe Application was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Application with id=" + id,
      });
    });
};

// Delete a Application with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Application.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Application was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Application with id=${id}. Maybe Application was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Application with id=" + id,
      });
    });
};

// Delete all DownloadLogs from the database.
exports.deleteAll = (req, res) => {
  Application.destroy({
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

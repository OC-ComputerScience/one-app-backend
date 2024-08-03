const db = require("../models");
const UserUniversity = db.userUniversity;
const Op = db.Sequelize.Op;

// Create and Save a new User University
exports.create = (req, res) => {
  // Validate request
  if (req.body.userId === undefined) {
    const error = new Error("User id cannot be empty for user university!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.universityId === undefined) {
    const error = new Error("University id cannot be empty for user university!");
    error.statusCode = 400;
    throw error;
  }

  // Create a UserUniversity
  const userUniversity = {
    userId: req.body.userId,
    universityId: req.body.universityId,
  };
  // Save UserUniversity in the database
  UserUniversity.create(userUniversity)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User University.",
      });
    });
};

// Retrieve all UserUniversities from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  UserUniversity.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single UserUniversity with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserUniversity.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving UserUniversity with id=" + id,
      });
    });
};

// Update a UserUniversity by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  UserUniversity.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserUniversity was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update UserUniversity with id=${id}. Maybe UserUniversity was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating UserUniversity with id=" + id,
      });
    });
};

// Delete a UserUniversity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserUniversity.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "UserUniversity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete UserUniversity with id=${id}. Maybe UserUniversity was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete UserUniversity with id=" + id,
      });
    });
};

// Delete all UserUniversities from the database.
exports.deleteAll = (req, res) => {
  UserUniversity.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} UserUniversities were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userUniversities.",
      });
    });
};

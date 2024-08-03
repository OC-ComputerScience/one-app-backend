const db = require("../models");
const University = db.university;
const Op = db.Sequelize.Op;

// Create and Save a new User University
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name id cannot be empty for university!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.status === undefined) {
    const error = new Error("Status cannot be empty for university!");
    error.statusCode = 400;
    throw error;
  }

  // Create a University
  const university = {
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    url: req.body.url,
    relationship: req.body.relationship,
    status: req.body.status,
  };
  // Save University in the database
  University.create(university)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the University.",
      });
    });
};

// Retrieve all Universities from the database.
exports.findAll = (req, res) => {
  const universityId = req.query.universityId;
  var condition = universityId
    ? {
        id: {
          [Op.like]: `%${universityId}%`,
        },
      }
    : null;

  University.findAll({ where: condition, order: [["name", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving universitys.",
      });
    });
};

// Find a single University with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  University.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving University with id=" + id,
      });
    });
};

// Update a University by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  University.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "University was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update University with id=${id}. Maybe University was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating University with id=" + id,
      });
    });
};

// Delete a University with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  University.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "University was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete University with id=${id}. Maybe University was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete University with id=" + id,
      });
    });
};

// Delete all Universities from the database.
exports.deleteAll = (req, res) => {
  University.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} universities were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all universities.",
      });
    });
};

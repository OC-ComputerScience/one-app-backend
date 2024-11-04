const db = require("../models");
const { Op } = require("sequelize");
const Role = db.role;

// Create and Save a new role
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "type cannot be empty!",
    });
    return;
  }

  const role = {
    type: req.body.type
  };

  // Create and Save a new role
  Role.create(role)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the role.",
      });
    });
};

// Retrieve all roles from the database
exports.findAll = (req, res) => {
  const sortVar = req.query.sortVar;
  var order = [];

  if (sortVar != undefined) {
    order.push([sortVar, req.query.order]);
  }

  Role.findAll({
    order: order,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};

// Retrieve a(n) role by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Role.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find role with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving role with id=" + id,
      });
    });
};

// Update a(n) role by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Role.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update role with id=" +
            id +
            ". Maybe the role was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating role with id=" + id,
      });
    });
};

// Delete a(n) role with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Role.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete role with id=" +
            id +
            ". Maybe the role was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete role with id=" + id,
      });
    });
};

// Delete all roles from the database.
exports.deleteAll = (req, res) => {
  Role.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} roles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all roles.",
      });
    });
};

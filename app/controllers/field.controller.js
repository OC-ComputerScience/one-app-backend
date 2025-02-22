const db = require("../models");
const { Op } = require("sequelize");
const Field = db.field;

// Create and Save a new field
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for field!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.type === undefined) {
    const error = new Error("Type cannot be empty for field!");
    error.statusCode = 400;
    throw error;
  }

  const field = {
    name: req.body.name,
    label: req.body.label,
    description: req.body.description,
    type: req.body.type,
    placeholderText: req.body.placeholderText,
    fieldSequence: req.body.fieldSequence,
    isRequired: req.body.isRequired,
    isEncrypted: req.body.isEncrypted,
    sorted: req.body.sorted,
    mask: req.body.mask,
    defaultField: req.body.defaultField,
  };

  // Create and Save a new field
  Field.create(field)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the field.",
      });
    });
};

// Retrieve all fields from the database
exports.findAll = (req, res) => {
  const sortVar = req.query.sortVar;
  var order = [];

  if (sortVar != undefined) {
    order.push([sortVar, req.query.order]);
  }

  Field.findAll({
    order: order,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving fields.",
      });
    });
};

// Retrieve a(n) field by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Field.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find field with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving field with id=" + id,
      });
    });
};

// Update a(n) field by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Field.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Field was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update field with id=" +
            id +
            ". Maybe the field was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating field with id=" + id,
      });
    });
};

// Delete a(n) field with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Field.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Field was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete field with id=" +
            id +
            ". Maybe the field was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete field with id=" + id,
      });
    });
};

// Delete all fields from the database.
exports.deleteAll = (req, res) => {
  Field.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} fields were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all fields.",
      });
    });
};

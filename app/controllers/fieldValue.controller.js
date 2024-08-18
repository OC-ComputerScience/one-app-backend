const db = require("../models");
const FieldValue = db.fieldValue;
const Op = db.Sequelize.Op;

// Create and Save a new FieldValue
exports.create = (req, res) => {
  // Validate request
  if (req.body.value === undefined) {
    const error = new Error("Value cannot be empty for field value!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.fieldId === undefined) {
    const error = new Error("Field id cannot be empty for field value!");
    error.statusCode = 400;
    throw error;
  }

  // Create a FieldValue
  const fieldValue = {
    value: req.body.value,
    fieldId: req.body.fieldId
  };
  // Save FieldValue in the database
  FieldValue.create(fieldValue)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the FieldValue.",
      });
    });
};

// Retrieve all FieldValues from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  FieldValue.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving field values.",
      });
    });
};

// Find a single FieldValue with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  FieldValue.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving FieldValue with id=" + id,
      });
    });
};

// Update a FieldValue by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  FieldValue.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Field Value was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Field Value with id=${id}. Maybe Field Value was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Field Value with id=" + id,
      });
    });
};

// Delete a FieldValue with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  FieldValue.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "FieldValue was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete FieldValue with id=${id}. Maybe FieldValue was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete FieldValue with id=" + id,
      });
    });
};

// Delete all FieldValues from the database.
exports.deleteAll = (req, res) => {
  FieldValue.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Field Values were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Field Values.",
      });
    });
};

const db = require("../models");
const { Op } = require("sequelize");
const FieldPageGroup = db.fieldPageGroup;

// Create and Save a new Field Page Group
exports.create = (req, res) => {
  // Validate request
  if (req.body.fieldId === undefined) {
    const error = new Error("FieldPageGroup id cannot be empty for field page group!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.pageId === undefined) {
    const error = new Error("Page id cannot be empty for field page group!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.sequenceNumber === undefined) {
    const error = new Error("Sequence number cannot be empty for field page group!");
    error.statusCode = 400;
    throw error;
  }

  const fieldPageGroup = {
    fieldId: req.body.fieldId,
    pageId: req.body.pageId,
    sequenceNumber: req.body.sequenceNumber
  };

  // Create and Save a new fieldPageGroup
  FieldPageGroup.create(fieldPageGroup)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the fieldPageGroup.",
      });
    });
};

// Retrieve all Field Page Groups from the database
exports.findAll = (req, res) => {
  const sortVar = req.query.sortVar;
  var order = [];

  if (sortVar != undefined) {
    order.push([sortVar, req.query.order]);
  }

  FieldPageGroup.findAll({
    order: order,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Field Page Groups.",
      });
    });
};

// Retrieve a(n) Field Page Group by id
exports.findById = (req, res) => {
  const id = req.params.id;
  FieldPageGroup.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find fieldPageGroup with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving fieldPageGroup with id=" + id,
      });
    });
};

// Update a(n) fieldPageGroup by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  FieldPageGroup.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "FieldPageGroup was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update fieldPageGroup with id=" +
            id +
            ". Maybe the fieldPageGroup was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating fieldPageGroup with id=" + id,
      });
    });
};

// Delete a(n) fieldPageGroup with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  FieldPageGroup.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "FieldPageGroup was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete fieldPageGroup with id=" +
            id +
            ". Maybe the fieldPageGroup was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete fieldPageGroup with id=" + id,
      });
    });
};

// Delete all Field Page Group from the database.
exports.deleteAll = (req, res) => {
  FieldPageGroup.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} field page group were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all field page group.",
      });
    });
};

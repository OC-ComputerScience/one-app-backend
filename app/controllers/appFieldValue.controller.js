const db = require("../models");
const AppFieldValue = db.appFieldValue;
const Op = db.Sequelize.Op;

// Create and Save a new App Field Value
exports.create = (req, res) => {
  // Validate request
  if (req.body.setNumber === undefined) {
    const error = new Error("Set Number cannot be empty for app field value!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.applicationId === undefined) {
    const error = new Error("Application id cannot be empty for app field value!");
    error.statusCode = 400;
    throw error;
  }

  // Create a AppFieldValue
  const appFieldValue = {
    setNumber: req.body.setNumber,
    applicationId: req.body.applicationId,
    fieldId: req.body.fieldId,
    fieldValueId: req.body.fieldValueId,
    fieldValueName: req.body.fieldValueName
  };
  // Save AppFieldValue in the database
  AppFieldValue.create(appFieldValue)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AppFieldValue.",
      });
    });
};

// Retrieve all AppFieldValue from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  AppFieldValue.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving app field values.",
      });
    });
};

// Find a single AppFieldValue with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  AppFieldValue.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving AppFieldValue with id=" + id,
      });
    });
};

// Update a AppFieldValue by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  AppFieldValue.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "AppFieldValue was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update AppFieldValue with id=${id}. Maybe AppFieldValue was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating AppFieldValue with id=" + id,
      });
    });
};

// Delete a AppFieldValue with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AppFieldValue.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "AppFieldValue was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete AppFieldValue with id=${id}. Maybe AppFieldValue was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete AppFieldValue with id=" + id,
      });
    });
};
// Delete a AppFieldValue with the specified id in the request
exports.deleteFieldValuesForAppSet = (req, res) => {
  const id = req.params.id;
  const fieldId = req.params.fieldId;
  const applicationId = req.params. applicationId;
  const setNumber = req.params.setNumber;

  AppFieldValue.destroy({
    where: { fieldId: fieldId, applicationId: applicationId, setNumber: setNumber },
  })
    .then(() => {
        res.send({
          message: "AppFieldValues were deleted successfully!",
        });

    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete AppFieldValue with id=" + fieldId,
      });
    });
};

// Delete all App Field Values from the database.
exports.deleteAll = (req, res) => {
  AppFieldValue.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} App Field Values were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all App Field Values.",
      });
    });
};

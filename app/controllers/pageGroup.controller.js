const db = require("../models");
const { Op } = require("sequelize");
const PageGroup = db.pageGroup;

// Create and Save a new pageGroup
exports.create = (req, res) => {
  // Validate request
  if (req.body.title === undefined) {
    const error = new Error("Title cannot be empty for pageGroup!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.pageId === undefined) {
    const error = new Error("Page id cannot be empty for pageGroup!");
    error.statusCode = 400;
    throw error;
  }

  const pageGroup = {
    title: req.body.title,
    text: req.body.text,
    groupSequence: req.body.groupSequence,
    maxSetCount: req.body.maxSetCount,
    minSetCount: req.body.minSetCount,
    displayType: req.body.displayType,
    pageId: req.body.pageId
  };

  // Create and Save a new pageGroup
  PageGroup.create(pageGroup)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the pageGroup.",
      });
    });
};

// Retrieve all pageGroups from the database
exports.findAll = (req, res) => {
  const sortVar = req.query.sortVar;
  var order = [];

  if (sortVar != undefined) {
    order.push([sortVar, req.query.order]);
  }

  PageGroup.findAll({
    order: order,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pageGroups.",
      });
    });
};

// Retrieve a(n) pageGroup by id
exports.findById = (req, res) => {
  const id = req.params.id;
  PageGroup.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find pageGroup with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving pageGroup with id=" + id,
      });
    });
};

// Update a(n) pageGroup by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  PageGroup.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PageGroup was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update pageGroup with id=" +
            id +
            ". Maybe the pageGroup was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating pageGroup with id=" + id,
      });
    });
};

// Delete a(n) pageGroup with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  PageGroup.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PageGroup was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete pageGroup with id=" +
            id +
            ". Maybe the pageGroup was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete pageGroup with id=" + id,
      });
    });
};

// Delete all pageGroups from the database.
exports.deleteAll = (req, res) => {
  PageGroup.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} pageGroups were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all pageGroups.",
      });
    });
};

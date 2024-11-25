const db = require("../models");
const { Op } = require("sequelize");
const Page = db.page;

// Create and Save a new page
exports.create = (req, res) => {
  // Validate request
  if (req.body.title === undefined) {
    const error = new Error("Title cannot be empty for page!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.pageSequence === undefined) {
    const error = new Error("Page sequence cannot be empty for page!");
    error.statusCode = 400;
    throw error;
  }

  const page = {
    title: req.body.title,
    text: req.body.text,
    pageSequence: req.body.pageSequence
  };

  // Create and Save a new page
  Page.create(page)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the page.",
      });
    });
};

// Retrieve all pages from the database
exports.findAll = async(req, res) => {
  const sortVar = req.query.sortVar;
  var order = [];

  if (sortVar != undefined) {
    order.push([sortVar, req.query.order]);
  }

  try{
    const data = await Page.findAll({
      order: order,
      include: [{
        model: db.pageGroup,
        include: [{
          model: db.fieldPageGroup,
          required: false,
          include: [db.field]
        }]
      }]
    })

    if(data){
      res.send(data)
    }
    else {
      res.status(404).send({
        message: "Cannot find pages"
      })
    }
  }
  catch(err){
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving pages.",
    });
  }

  // Page.findAll({
  //   order: order,
  // })
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: err.message || "Some error occurred while retrieving pages.",
  //     });
  //   });
};

// Retrieve a(n) page by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Page.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find page with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving page with id=" + id,
      });
    });
};

// Update a(n) page by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Page.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Page was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update page with id=" +
            id +
            ". Maybe the page was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating page with id=" + id,
      });
    });
};

// Delete a(n) page with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Page.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Page was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete page with id=" +
            id +
            ". Maybe the page was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete page with id=" + id,
      });
    });
};

// Delete all pages from the database.
exports.deleteAll = (req, res) => {
  Page.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} pages were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all pages.",
      });
    });
};

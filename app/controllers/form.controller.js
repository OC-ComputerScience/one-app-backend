const db = require("../models");
const { Op, where } = require("sequelize");
const Form = db.form;

// Create and Save a new form
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
      const error = new Error("Name cannot be empty for form!");
      error.statusCode = 400;
      throw error;
  } else if (req.body.status === undefined) {
      const error = new Error("Form status cannot be empty for form!");
      error.statusCode = 400;
      throw error;
  } else if (req.body.mainForm === undefined) {
      const error = new Error("Form status cannot be empty for form!");
      error.statusCode = 400;
      throw error;
  }
  
  const form = {
    name: req.body.name,
    status: req.body.status,
    mainForm: req.body.mainForm,
  };

  // Create and Save a new form
  Form.create(form)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the form.",
      });
    });
};

// Retrieve all forms from the database
exports.findAll = async(req, res) => {
  const sortVar = req.query.sortVar;
  var order = [];

  if (sortVar != undefined) {
    order.push([sortVar, req.query.order]);
  }

  try{
    const data = await Form.findAll({
      order: order,
      
    })

    if(data){
      res.send(data)
    }
    else {
      res.status(404).send({
        message: "Cannot find forms"
      })
    }
  }
  catch(err){
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving forms.",
    });
  }
};

// Retrieve all forms from the database
exports.findMain = async(req, res) => {

  try{
    const data = await Form.findAll({
      where: {mainForm: true},
    })
    if(data){
      res.send(data)
    }
    else {
      res.status(404).send({
        message: "Cannot find Main form."
      })
    }
  }
  catch(err){
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Main form.",
    });
  }
};

// Retrieve a(n) form by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Form.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find form with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving form with id=" + id,
      });
    });
};



// Update form by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Form.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Form was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update form with id=" +
            id +
            ". Maybe the form was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating form with id=" + id,
      });
    });
};

// Delete a(n) form with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Form.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Form was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete form with id=" +
            id +
            ". Maybe the form was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete form with id=" + id,
      });
    });
};

// Delete all forms from the database.
exports.deleteAll = (req, res) => {
  Form.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} forms were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all forms.",
      });
    });
}

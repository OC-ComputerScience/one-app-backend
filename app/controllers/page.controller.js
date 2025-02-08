const db = require("../models");
const { Op, where } = require("sequelize");
const Page = db.page;
const Application= db.application;

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
  } else if (req.body.formId === undefined) {
    const error = new Error("Page formId cannot be empty for page!");
    error.statusCode = 400;
    throw error;
  }

  const page = {
    title: req.body.title,
    text: req.body.text,
    pageSequence: req.body.pageSequence,
    formId: req.body.formId,
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
  let formId = req.params.formId;
  const sortVar = req.query.sortVar;
  var order = [];

  if (sortVar != undefined) {
    order.push([sortVar, req.query.order]);
  }

  try{
    const data = await Page.findAll({
      order: order,
      where: formId ? {formId: formId} : {},
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

exports.findByUserId = async(req, res) => {

  const userId = req.params.id;
  const formId = req.params.formId;
  var appId;
  await Application.findAll({where: [{userId:userId}]}).then((data) => { appId = data[0].id; });

  try {
    const pages = await Page.findAll({ 
      order: [['pageSequence', 'ASC']],
      where: [{formId: formId}] ,
      include: [{
        model: db.pageGroup,
        order: [['groupSequence', 'ASC']],
        include: [{
          model: db.fieldPageGroup,
          order: [['sequenceNumber', 'ASC']],
          required: false,
          include: [{
            model: db.field,
            order: [['fieldSequence', 'ASC']],
            include: [
              {
                model: db.appFieldValue,
                required: false,
                where: {applicationId: appId}
              },
              {
                model: db.fieldValue,
                required: false,
              }
            ]
          }]
        }]
      }]
    })

    const processedPages = pages.map(page => {
      const processedPage = page.toJSON()
      processedPage.pageGroups = (page.pageGroups || []).map(pageGroup => {
        const maxGroups = (pageGroup.fieldPageGroups || []).reduce((max, fpg) => {
          if (!fpg || !fpg.field) return max
          const fieldMax = (fpg.field.appFieldValues || []).length
          return Math.max(max, fieldMax)
        }, 1)
        return {
          ...(pageGroup.toJSON() || {}),
          numGroups: maxGroups
        }
      })
      return processedPage
    });

    res.send(processedPages)
  }
  catch (err) {
    console.error('Error in findByUserId:', err)
    res.status(500).send({
      message: "Error retrieving pages for user",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
  }
}

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

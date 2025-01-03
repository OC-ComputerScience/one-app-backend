const db = require("../models");
const Application = db.application;
const Page = db.page;
const Op = db.Sequelize.Op;


// Create and Save a new Application
exports.create = (req, res) => {
  // Validate request
  if (req.body.userId === undefined) {
    const error = new Error("User id cannot be empty for application!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.status === undefined) {
    const error = new Error("Status cannot be empty for application!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.formId === undefined) {
    const error = new Error("FormId cannot be empty for application!");
    error.statusCode = 400;
    throw error;
}

  // Create a Application
  const application = {
    status: req.body.status,
    userId: req.body.userId,
    formId: req.body.formId,
  };
  // Save Application in the database
  Application.create(application)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Application.",
      });
    });
};

// Retrieve all DownloadLogs from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Application.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single Application with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  Application.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Application with id=" + id,
      });
    });
};

exports.findbyUserId = async (req, res) => {
  const id = req.params.userId;

  try {
    const data = await Application.findAll({ 
      where: { userId: id }
    });
    res.send(data);
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Application with user id=" + id,
    });
  }

};

// Update a Application by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Application.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Application was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Application with id=${id}. Maybe Application was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Application with id=" + id,
      });
    });
};

// Delete a Application with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Application.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Application was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Application with id=${id}. Maybe Application was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Application with id=" + id,
      });
    });
};

// Delete all DownloadLogs from the database.
exports.deleteAll = (req, res) => {
  Application.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} DownloadLogs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all DownloadLogs.",
      });
    });
};

exports.findAllbyFormDate = async(req, res) => {

  const date = new Date (req.params.date);
  const formId = req.params.formId;
  console.log("date", date)
  console.log("formId", formId)
 try {
  const applications= await Application.findAll(
    {where: {
      
        formId: {[Op.eq]: formId},
        updatedAt: {[Op.gt]:  date},
        status: {[Op.eq]: "submitted"},
        },
    include: [{
      model: db.form,
      include: [{
        model: db.page,
        order: [['pageSequence', 'ASC']],
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
                  order: [['setNumber', 'ASC']],
                  where: [{applicationId: {[Op.eq]: db.sequelize.col('application.id')} }],
                  required: false,
                  
                },
                {
                  model: db.fieldValue,
                  required: false,
                }
              ]
            }]
          }]
        }]
      }]
    }]
  })
    
    applications.forEach(application => {
      let newPages = processPages(application.form.pages)
      application.pages = newPages

    })
    res.send(applications)
  }
  catch (err) {
    console.log("error", err.message) 
    res.status(500).send({
      message: "Error retrieving/processing  applicaitons and pages"+ err.message,
   
    })
  }
}

const processPages = ((pages) => {
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
  })
})

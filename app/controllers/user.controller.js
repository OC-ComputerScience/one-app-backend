const db = require("../models");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const { encrypt, getSalt, hashPassword } = require("../authentication/crypto");

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  if (req.body.firstName === undefined) {
    const error = new Error("First name cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.lastName === undefined) {
    const error = new Error("Last name cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.email === undefined) {
    const error = new Error("Email cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.password === undefined) {
    const error = new Error("Password cannot be empty for user!");
    error.statusCode = 400;
    throw error;
  }

  // find by email
  await User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (data) => {
    
      if (data) {
        res.status(422).send({message : "Email already exits."})
      
      
      } else 
      {
        let salt = await getSalt();
        let hash = await hashPassword(req.body.password, salt);
      
        // Create a User
        const user = {
          firstName: req.body.firstName,
          middleName: req.body.middleName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone || null,
          streetAddress: req.body.streetAddress || null,
          city: req.body.city || null,
          state: req.body.state || null,
          zip: req.body.zip || null,
          congregation: req.body.congregation || null,
          howHeard: req.body.howHeard || null,
          status: "inactive",
          resetCode: req.body.resetCode || null,
          password: hash,
          salt: salt,
          roleId: req.body.roleId ,
          universityId: req.body.universityId || null,
          hsgradyear: req.body.hsgradyear || null,
        };
       if (user.roleId == 2) user.status = "active";

        // Save User in the database
        await User.create(user)
          .then(async (data) => {
            // Create a Session for the new user
            let userId = data.id;

            let expireTime = new Date();
            expireTime.setDate(expireTime.getDate() + 1);

            const session = {
              email: req.body.email,
              userId: userId,
              expirationDate: expireTime,
            };
            await Session.create(session).then(async (data) => {
              let sessionId = data.id;
              let token = await encrypt(sessionId);
              let userInfo = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user.id,
                token: token,
              };
              res.send(userInfo);
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          });
      }
    })

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ 
    where: condition, include: [db.role],
    attributes: ['id', 'email', 'lastName', 'firstName', 'roleId', 'streetAddress', 'city', 'state', 'zip', 'phone', 'congregation', 'status', 'universityId', 'hsgradyear', 'howHeard', 'resetCode'],
 
  },
 
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with id = " + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findById({
    where: {
      email: email,
    },
    include: [db.role],
    attributes: ['id', 'email', 'lastName', 'firstName', 'roleId', 'streetAddress', 'city', 'state', 'zip', 'phone', 'congregation', 'status', 'universityId', 'hsgradyear', 'howHeard', 'resetCode'],
 
    
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id =" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id = ${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete User with id = " + id,
      });
    });
};



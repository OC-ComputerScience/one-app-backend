const { saltSize, keySize } = require("../authentication/crypto");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    middleName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    streetAddress: {  
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    state: {    
      type: Sequelize.STRING,
      allowNull: true,
    },
    zip: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    congregation: { 
      type: Sequelize.STRING,
      allowNull: true,
    },
    howHeard: { 
      type: Sequelize.STRING,
      allowNull: true,
    },
    hsgradyear: { 
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "inactive",
    },
    resetCode: { 
      type: Sequelize.STRING,
      allowNull: true,
    },
    resetTokenExpiry: {
      type: Sequelize.DATE(6),
      allowNull: true,
    },
    password: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    salt: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
  })

  return User;
};

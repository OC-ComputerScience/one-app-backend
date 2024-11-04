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
    password: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    salt: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
  });

  return User;
};

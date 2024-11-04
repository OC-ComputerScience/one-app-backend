module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Role;
  };
  
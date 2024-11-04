module.exports = (sequelize, Sequelize) => {
    const University = sequelize.define("university", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING,
      },
      relationship: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return University;
  };
  
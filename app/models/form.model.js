module.exports = (sequelize, Sequelize) => {
    const Form = sequelize.define("form", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mainForm: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
  
    });
  
    return Form;
  };
  
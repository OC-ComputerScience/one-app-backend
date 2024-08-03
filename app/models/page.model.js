module.exports = (sequelize, Sequelize) => {
    const Page = sequelize.define("page", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING
      },
      pageSequence: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return Page;
  };
  
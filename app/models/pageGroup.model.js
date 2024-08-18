module.exports = (sequelize, Sequelize) => {
    const PageGroup = sequelize.define("pageGroup", {
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
      groupSequence: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      maxSetCount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      minSetCount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      displayType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return PageGroup;
  };
  
module.exports = (sequelize, Sequelize) => {
    const FieldPageGroup = sequelize.define("fieldPageGroup", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      sequenceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return FieldPageGroup;
  };
  
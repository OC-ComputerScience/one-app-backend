module.exports = (sequelize, Sequelize) => {
  const AppFieldValue = sequelize.define("appFieldValue", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    setNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    fieldValueName: {
      type: Sequelize.STRING,
    }
  });
  return AppFieldValue;
};

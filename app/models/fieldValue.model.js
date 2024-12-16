module.exports = (sequelize, Sequelize) => {
  const FieldValue = sequelize.define("fieldValue", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return FieldValue;
};

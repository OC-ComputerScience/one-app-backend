module.exports = (sequelize, Sequelize) => {
  const Application = sequelize.define("application", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Application;
};

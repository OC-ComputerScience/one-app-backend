module.exports = (sequelize, Sequelize) => {
  const UserUniversity = sequelize.define("userUniversity", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    }
  });
  return UserUniversity;
};

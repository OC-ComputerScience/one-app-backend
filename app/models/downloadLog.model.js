module.exports = (sequelize, Sequelize) => {
  const DownloadLog = sequelize.define("downloadLog", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    fileName: {
      type: Sequelize.STRING
    },
    dateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    }
  });
  return DownloadLog;
};

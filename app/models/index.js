const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.appFieldValue = require("./appFieldValue.model.js")(sequelize, Sequelize);
db.application = require("./application.model.js")(sequelize, Sequelize);
db.downloadLog = require("./downloadLog.model.js")(sequelize, Sequelize);
db.field = require("./field.model.js")(sequelize, Sequelize);
db.fieldPageGroup = require("./fieldPageGroup.model.js")(sequelize, Sequelize);
db.fieldValue = require("./fieldValue.model.js")(sequelize, Sequelize);
db.page = require("./page.model.js")(sequelize, Sequelize);
db.pageGroup = require("./pageGroup.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.university = require("./university.model.js")(sequelize, Sequelize);
db.userUniversity = require("./userUniversity.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);


// foreign key for app field value
db.application.hasMany(
  db.appFieldValue,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.appFieldValue.belongsTo(
  db.application,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.field.hasMany(
  db.appFieldValue,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.appFieldValue.belongsTo(
  db.field,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.fieldValue.hasMany(
  db.appFieldValue,
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.appFieldValue.belongsTo(
  db.fieldValue,
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// foreign key for application
db.user.hasMany(
  db.application,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.application.belongsTo(
  db.user,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for download log
db.university.hasMany(
  db.downloadLog,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.downloadLog.belongsTo(
  db.university,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.user.hasMany(
  db.downloadLog,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.downloadLog.belongsTo(
  db.user,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for field value
db.field.hasMany(
  db.fieldValue,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.fieldValue.belongsTo(
  db.field,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for field group page
db.field.hasMany(
  db.fieldPageGroup,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.fieldPageGroup.belongsTo(
  db.field,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.page.hasMany(
  db.fieldPageGroup,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.fieldPageGroup.belongsTo(
  db.page,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for group page
db.page.hasMany(
  db.pageGroup,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.pageGroup.belongsTo(
  db.page,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for users
db.role.hasMany(db.user, {
  foreignKey: { allowNull: false },
});
db.user.belongsTo(db.role, {
  foreignKey: { allowNull: false },
});

db.university.hasMany(db.user, {
  foreignKey: { allowNull: true },
});
db.user.belongsTo(db.university, {
  foreignKey: { allowNull: true },
});

// foreign key for user university
db.university.hasMany(
  db.userUniversity,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.userUniversity.belongsTo(
  db.university,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.user.hasMany(
  db.userUniversity,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.userUniversity.belongsTo(
  db.user,
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;

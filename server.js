require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

// add and update columns in the database if they have changed
db.sequelize.sync({ force: false });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the one app backend." });
});

require("./app/routes/appFieldValue.routes.js")(app);
require("./app/routes/application.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
require("./app/routes/downloadLog.routes")(app);
require("./app/routes/field.routes.js")(app);
require("./app/routes/fieldPageGroup.routes.js")(app);
require("./app/routes/fieldValue.routes.js")(app);
require("./app/routes/page.routes.js")(app);
require("./app/routes/pageGroup.routes.js")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/university.routes")(app);
require("./app/routes/userUniversity.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/form.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3201;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;

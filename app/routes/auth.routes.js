module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");
  const { loginLimiter } = require("../middleware/rateLimiter");

  var router = require("express").Router();

  // Login with rate limiting
  router.post("/login", loginLimiter, auth.login);

  // Logout
  router.post("/logout", auth.logout);

  app.use("/oneapp-api", router);
};

module.exports = (app) => {
    const page = require("../controllers/page.controller.js");
    const { authenticateRoute } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new page
    router.post("/", [authenticateRoute], page.create);
    // Retrieve all pages
    router.get("/", [authenticateRoute], page.findAll);
    // Retrieve a single page with id
    router.get("/:id", [authenticateRoute], page.findById);

    router.get("/user/:userId", [authenticateRoute], page.findByUserId);
    // Update a page with id
    router.put("/:id", [authenticateRoute], page.update);
    // Delete a page with id
    router.delete("/:id", [authenticateRoute], page.delete);
    // Delete all pages
    router.delete("/", [authenticateRoute], page.deleteAll);
  
    app.use("/oneapp-api/pages", router);
  };
  
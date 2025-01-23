module.exports = (app) => {
    const page = require("../controllers/page.controller.js");
    const { authenticateRoute,isAdmin } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new page
    router.post("/", [authenticateRoute,isAdmin], page.create);
    // Retrieve all pages
    router.get("/", [authenticateRoute], page.findAll);
    // Retrieve all pages with form id
    router.get("/form/:formId", [authenticateRoute], page.findAll);
  
    // Retrieve a single page with id
    router.get("/:id", [authenticateRoute], page.findById);

    router.get("/user/:userId/form/:formId", [authenticateRoute], page.findByUserId);
    // Update a page with id
    router.put("/:id", [authenticateRoute,isAdmin], page.update);
    // Delete a page with id
    router.delete("/:id", [authenticateRoute,isAdmin], page.delete);
  
    app.use("/oneapp-api/pages", router);
  };
  
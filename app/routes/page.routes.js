module.exports = (app) => {
    const page = require("../controllers/page.controller.js");
    const { authenticateRoute,isAdmin,isAdminOrId } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new page
    router.post("/", [authenticateRoute,isAdmin], page.create);
    // Retrieve all pages
    router.get("/", [authenticateRoute,isAdmin], page.findAll);
    // Retrieve all pages with form id
    router.get("/form/:formId", [authenticateRoute,isAdmin], page.findAll);
  
    // Retrieve a single page with id
    router.get("/:id", [authenticateRoute,isAdmin], page.findById);

    router.get("/user/:id/form/:formId", [authenticateRoute,isAdminOrId], page.findByUserId);
    // Update a page with id
    router.put("/:id", [authenticateRoute,isAdmin], page.update);
    // Delete a page with id
    router.delete("/:id", [authenticateRoute,isAdmin], page.delete);
  
    app.use("/oneapp-api/pages", router);
  };
  
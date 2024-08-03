module.exports = (app) => {
    const page = require("../controllers/page.controller.js");
    const { authenticate } = require("../authentication/authentication.js");
    var router = require("express").Router();
  
    // Create a new page
    router.post("/", [authenticate], page.create);
    // Retrieve all pages
    router.get("/", [authenticate], page.findAll);
    // Retrieve a single page with id
    router.get("/:id", [authenticate], page.findById);
    // Update a page with id
    router.put("/:id", [authenticate], page.update);
    // Delete a page with id
    router.delete("/:id", [authenticate], page.delete);
    // Delete all pages
    router.delete("/", [authenticate], page.deleteAll);
  
    app.use("/oneapp-api/pages", router);
  };
  
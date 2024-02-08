// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const middleware = require("../utilities/index");

// Route to build inventory by classification view
router.get("/type/:classificationId", middleware.handleErrors(invController.buildByClassificationId));

// Route to build details view by inventory Id
router.get("/detail/:inventoryId", middleware.handleErrors(invController.buildByInventoryId));

// Route to build error 500 view  
router.get(
    "/error/500",
    middleware.handleErrors(invController.buildError)
  );

module.exports = router;
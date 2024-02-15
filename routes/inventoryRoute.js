// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const middleware = require("../utilities/index");
const mngValidate = require("../utilities/management-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", middleware.handleErrors(invController.buildByClassificationId));

// Route to build details view by inventory Id
router.get("/detail/:inventoryId", middleware.handleErrors(invController.buildByInventoryId));

// Route to build error 500 view  
router.get(
    "/error/500",
    middleware.handleErrors(invController.buildError)
);

// Route to management view
router.get("/", middleware.handleErrors(invController.buildManagement));

//Route to add classification view
router.get("/add-classification", middleware.handleErrors(invController.buildAddClassification));

// Process the new classification data
router.post(
    "/add-classification",
    mngValidate.classificationRules(),
    mngValidate.checkClassificationData,
    middleware.handleErrors(invController.addClassification)
)

router.get("/add-inventory", middleware.handleErrors(invController.buildAddInventoryView))
router.post("/add-inventory", mngValidate.inventoryRules(), mngValidate.checkInventoryData, middleware.handleErrors(invController.addInventory))


module.exports = router;
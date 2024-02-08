// Needed Resources 
const express = require("express")
const router = new express.Router() 
const middleware = require("../utilities/index");
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", middleware.handleErrors(accountController.buildLogin))

// Route to build registration view
router.get("/register", middleware.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    middleware.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login", 
  regValidate.loginRules(), 
  regValidate.checkLoginData, 
  middleware.handleErrors(accountController.accountLogin))


module.exports = router;
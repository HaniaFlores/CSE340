const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const inventoryModel = require("../models/inventory-model")


/* ***************************
 *  Classification Rules
 * ************************** */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Please provide a classification name with at least 3 characters")
      .custom(async (classification_name) => {
        const classificationExists = await inventoryModel.checkExistingClassification(classification_name)
        if (classificationExists){
            throw new Error("Classification already exists. Please use a different name")
        }
    }),
  ]
}


/* ***************************
 *  Check New Classification Data
 * ************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name
        })
        return
    }
    next()
}

  module.exports = validate
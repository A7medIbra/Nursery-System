const { body, param } = require('express-validator');
const validator = require('express-validator');

exports.createChildValid =
    [
        body("fullname").isString().isLength({ min: 3, max: 20 }).withMessage("Name must be a string and between 3 and 20 characters long"),
        body("age").isNumeric().withMessage("Age must be a number"),
        body("level").matches(/^(PreKG)|(KG1)|(KG2)^/).withMessage("Level must be PreKG, KG1 or KG2"),
        body("address.city").isString().withMessage("City must be a string"),
        body("address.street").isString().withMessage("Street must be a string"),
        body("address.building").isString().withMessage("Building must be a string")
    ]
exports.updateChildValid = [
    body("fullname").optional().isString().isLength({ min: 3, max: 20 }).withMessage("Name must be a string and between 3 and 20 characters long"),
    body("age").optional().isNumeric().withMessage("Age must be a number"),
    body("level").optional().matches(/^(PreKG)|(KG1)|(KG2)^/).withMessage("Level must be PreKG, KG1 or KG2"),
    body("address.city").optional().isString().withMessage("City must be a string"),
    body("address.street").optional().isString().withMessage("Street must be a string"),
    body("address.building").optional().isString().withMessage("Building must be a string")
]
exports.deleteChildValid = [
    body("id").notEmpty().isNumeric().withMessage("ID must be a number")
]
exports.getChildByIdValid = [
    param("id").notEmpty().isNumeric().withMessage("ID must be a number")
]

exports.validMSG = (request, response, next) => {
    const errors = validator.validationResult(request);
    if (errors.isEmpty()) return next();
    response.status(400).json(
        { erros: errors.array().reduce((acc, error) => { acc[error.param] = error.msg; return acc }, {}) }
    );
}

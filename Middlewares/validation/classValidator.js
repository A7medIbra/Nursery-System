const { body, param, validationResult } = require('express-validator');
const validator = require('express-validator');

exports.createClassValid = [
    body("name").isString().isLength({ min: 3, max: 20 }).withMessage("Name must be a string and between 3 and 20 characters long"),
    body("supervisor").isNumeric().withMessage("Supervisor must be a number"),
    body("children").optional().isArray().withMessage("Children must be an array of numbers")
]
exports.updateClassValid = [
    body("name").optional().isString().isLength({ min: 3, max: 20 }).withMessage("Name must be a string and between 3 and 20 characters long"),
    body("supervisor").optional().isNumeric().withMessage("Supervisor must be a number"),
    body("children").optional().isArray().withMessage("Children must be an array of numbers")
]
exports.deleteClassValid = [
    body("id").notEmpty().isNumeric().withMessage("ID must be a number")
]
exports.getClassByIdValid = [
    param("id").notEmpty().isNumeric().withMessage("ID must be a number")
]

exports.validMSG = (request, response, next) => {
    const errors = validationResult(request);
    if (errors.isEmpty()) return next();
    response.status(400).json(
        { erros: errors.array().reduce((acc, error) => { acc[error.param] = error.msg; return acc }, {}) }
    );
}
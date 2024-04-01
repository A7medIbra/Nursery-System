const { body, param, validationResult } = require('express-validator');
const validator = require('express-validator');

exports.createTeacherValid = [
    body("fullname").isString().isLength({ min: 3, max: 20 }).withMessage("Name must be a string and between 3 and 20 characters long"),
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("password").isLength({ min: 8, max: 20 }).withMessage("Password must be between 8 and 20 characters long"),
    body("image").optional().isString().withMessage("Image must be a string")
],
    exports.updateTeacherValid = [
        body("fullname").optional().isString().isLength({ min: 3, max: 20 }).withMessage("Name must be a string and between 3 and 20 characters long"),
        body("email").optional().isEmail().withMessage("Email must be a valid email"),
        body("password").optional().isLength({ min: 8, max: 20 }).withMessage("Password must be between 8 and 20 characters long"),
        body("image").optional().isString().withMessage("Image must be a string")
    ],
    exports.deleteTeacherValid = [
        body("_id").notEmpty().isMongoId().withMessage("ID must be a number")
    ],
    exports.getTeacherByIdValid = [
        param("id").notEmpty().isMongoId().withMessage("ID must be a number")
    ]

exports.validMSG = (request, response, next) => {
    const errors = validationResult(request);
    if (errors.isEmpty()) return next();
    response.status(400).json(
        { erros: errors.array().reduce((acc, error) => { acc[error.param] = error.msg; return acc }, {}) }
    );
}


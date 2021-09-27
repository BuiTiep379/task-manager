const { check, validationResult } = require('express-validator');

const validate = [
    check('name')
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 5 })
    .withMessage("Name  must be 5+ chars long")
]
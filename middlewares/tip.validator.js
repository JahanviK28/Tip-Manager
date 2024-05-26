const { body, validationResult, query } = require('express-validator');
const moment = require("moment");

exports.validateCreateTip = [
    body('place').notEmpty().withMessage('Place is required'),
    body('totalAmount').notEmpty().withMessage('Total amount is required').isNumeric().withMessage('Total amount must be numeric'),
    body('tipPercentage').notEmpty().withMessage('Tip percentage is required').isNumeric().withMessage('Tip percentage must be numeric'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateGetTips = [
    query('startDate').optional().custom((value) => {
        if (value && !moment(value, 'DD-MM-YYYY', true).isValid()) {
            throw new Error('Invalid start date format. Please use "dd-mm-yyyy".');
        }
        return true;
    }),
    query('endDate').optional().custom((value) => {
        if (value && !moment(value, 'DD-MM-YYYY', true).isValid()) {
            throw new Error('Invalid end date format. Please use "dd-mm-yyyy".');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
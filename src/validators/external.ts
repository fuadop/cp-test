import { body } from "express-validator";

export const validateBody = () => [
  body("to")
    .trim()
    .notEmpty()
    .withMessage("to must not be empty")
    .isString()
    .withMessage("to must be a string")
    .isLength({ min: 3, max: 3 })
    .withMessage("to must be of 3 characters")
    .toUpperCase(),
  body("amount")
    .notEmpty()
    .withMessage("amount must not be empty")
    .isFloat({ min: 0 })
    .withMessage("amount must be a positive number")
    .toFloat()
];
import { body } from "express-validator";

export const validateBody = () => [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name must not be empty")
    .isString()
    .withMessage("name must be a string")
    .toLowerCase(),
  body("password")
    .notEmpty()
    .withMessage("name must not be empty")
    .isString()
    .withMessage("name must be a string")
];
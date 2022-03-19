import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import handleResponse from "../utils/response";

const validate = () =>
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return handleResponse(res, 422, errors.array()[0].msg);
};

export default validate;


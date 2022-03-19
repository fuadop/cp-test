import { config } from "dotenv";
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import handleResponse from '../utils/response';

config();

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
const parseAuthToken = () =>
  (req: Request, res: Response, next: NextFunction) => {
    const $auth = req.header('Authorization');
    if (!$auth) {
      handleResponse(res, 401, 'Unauthorized, Please login');
      return;
    }

    const $token = $auth.split(' ')[1];
    if (!$token) {
      handleResponse(res, 401, 'Invalid token, Please login');
    }

    let user = {};
    try {
      user = jwt.verify($token, JWT_SECRET);
    } catch (e) {
      handleResponse(res, 401, 'Invalid token, Please login');
    }

    // @ts-ignore
    req.user = user;
    res.locals.user = user;
    next();
  };

export default parseAuthToken;
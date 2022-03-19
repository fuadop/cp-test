import {
  Request,
  Response,
  NextFunction
} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import User from "../models/user";
import handleResponse from "../utils/response";

config();

type Controller = () => (req: Request, res: Response, next: NextFunction) => any;

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
export const register: Controller = () => async (req, res, next) => {
  try {
    const {
      name,
      password
    } = req.body;

    let user = await User.findOne({ name });

    if (user) {
      return handleResponse(res, 401, "user with selected name already exists");
    }

    user = await User.create({
      name,
      password
    });

    // create token for user
    const detail = {
      _id: user._id,
      name: user.name
    };

    const token = jwt.sign(detail, JWT_SECRET);
    return handleResponse(res, 201, "registration successful", { user: detail, token });
  } catch (e) {
    return next(e);
  }
};

export const login: Controller = () => async (req, res, next) => {
  try {
    const {
      name,
      password
    } = req.body;

    const user = await User.findOne({
      name
    });

    if (!user) {
      return handleResponse(res, 403, "user not found");
    }

    // compare passwords
    if (!bcrypt.compareSync(password, user.password)) {
      return handleResponse(res, 403, "incorrect password");
    }
    // create token for user
    const detail = {
      _id: user._id,
      name: user.name
    };

    const token = jwt.sign(detail, JWT_SECRET);
    return handleResponse(res, 201, "login successful", { user: detail, token });
  } catch (e) {
    return next(e);
  }
};
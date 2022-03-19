import { Router } from "express";
import { login, register } from "../controllers/auth";
import validate from "../validators";
import { validateBody } from "../validators/auth";

const router = Router();

router.post(
  "/register",
  validateBody(),
  validate(),
  register()
);

router.post(
  "/login",
  validateBody(),
  validate(),
  login()
);

export default router;

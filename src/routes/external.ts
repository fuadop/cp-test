import { Router } from "express";
import { manualConvert, symbols } from "../controllers/external";
import parseAuthToken from "../middlewares/token";
import validate from "../validators";
import { validateBody } from "../validators/external";

const router = Router();

router.use(parseAuthToken());

router.get(
  "/symbols",
  symbols()
);

// convert from EUR to other currency
router.post(
  "/convert",
  validateBody(),
  validate(),
  manualConvert()
);

export default router;

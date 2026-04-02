import express from "express";
import { upload } from "../middleware/multerMiddleware.js";
import {
  createLogoHandler,
  deleteLogoHandler,
  getLogosHandler,
  updateLogoHandler,
} from "../controllers/logoController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  createLogoHandler
);
router.get("/", getLogosHandler);
router.put(
  "/:id",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  updateLogoHandler
);
router.get("/:id", deleteLogoHandler);

export default router;

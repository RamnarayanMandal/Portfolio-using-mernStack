import express from "express";
import {
  createCertificateHandler,
  deleteCertificateHandler,
  updateCertificateHandler,
  getCertificateByIdHandler,
  getAllCertificatesHandler,
} from "../controllers/certificateController.js";
import { upload } from "../middleware/multerMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  authMiddleware,
  createCertificateHandler
);
router.delete("/delete/:id", authMiddleware, deleteCertificateHandler);
router.put(
  "/update/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  authMiddleware,
  updateCertificateHandler
);
router.get("/getById/:id", authMiddleware, getCertificateByIdHandler);
router.get("/gettAllcertificates", getAllCertificatesHandler);

export default router;

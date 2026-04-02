import express from "express";
import {
  createContactHandler,
  getAllContactsHandler,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/create", createContactHandler);
router.get("/", getAllContactsHandler);

export default router;

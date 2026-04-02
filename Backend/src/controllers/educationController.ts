import type { Request, Response } from "express";
import {
  createEducation,
  updateEducation,
  getAllEducation,
  getEducationById,
  deleteEducation,
} from "../services/educationService.js";
import { HttpError } from "../types/errors.js";
import { routeParam } from "../utils/routeParams.js";

type MulterFiles = Record<string, Express.Multer.File[]>;

export const createEducationHandler = async (req: Request, res: Response) => {
  try {
    const education = await createEducation(
      req.body as Parameters<typeof createEducation>[0],
      req.files as MulterFiles
    );
    res.status(201).json({
      message: "Education record created successfully!",
      education,
    });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: error instanceof Error ? error.message : "Error creating education record",
    });
  }
};

export const getAllEducationHandler = async (_req: Request, res: Response) => {
  try {
    const educationRecords = await getAllEducation();
    if (educationRecords.length === 0) {
      return res.status(404).json({ message: "No education records found" });
    }
    res.status(200).json(educationRecords);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "" });
  }
};

export const getEducationByIdHandler = async (req: Request, res: Response) => {
  try {
    const education = await getEducationById(routeParam(req.params.id));
    if (!education) {
      return res.status(404).json({ message: "Education record not found" });
    }
    res.status(200).json(education);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "" });
  }
};

export const updateEducationHandler = async (req: Request, res: Response) => {
  try {
    const education = await updateEducation(
      routeParam(req.params.id),
      req.body,
      req.files as MulterFiles
    );
    res.status(200).json(education);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "" });
  }
};

export const deleteEducationHandler = async (req: Request, res: Response) => {
  try {
    const education = await deleteEducation(routeParam(req.params.id));
    if (!education) {
      return res.status(404).json({ message: "Education record not found" });
    }
    res.status(200).json({ message: "Education record deleted" });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "" });
  }
};

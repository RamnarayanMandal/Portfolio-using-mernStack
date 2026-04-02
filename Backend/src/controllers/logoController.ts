import type { Request, Response } from "express";
import {
  createLogo,
  updateLogo,
  deleteLogo,
  getAllLogos,
} from "../services/logoService.js";
import { HttpError } from "../types/errors.js";
import { routeParam } from "../utils/routeParams.js";

type MulterFiles = Record<string, Express.Multer.File[]>;

export const createLogoHandler = async (req: Request, res: Response) => {
  try {
    const logo = await createLogo(req.files as MulterFiles, req.body);
    res.status(201).send(logo);
  } catch (error) {
    console.error("Error creating logo:", error);
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).send("Failed to create logo");
  }
};

export const getLogosHandler = async (_req: Request, res: Response) => {
  try {
    const logos = await getAllLogos();
    res.status(200).send(logos);
  } catch (error) {
    console.error("Error fetching logos:", error);
    res.status(500).send("Failed to fetch logos");
  }
};

export const updateLogoHandler = async (req: Request, res: Response) => {
  try {
    const logo = await updateLogo(
      routeParam(req.params.id),
      req.files as MulterFiles,
      req.body
    );
    res.status(200).send(logo);
  } catch (error) {
    console.error("Error updating logo:", error);
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).send("Failed to update logo");
  }
};

export const deleteLogoHandler = async (req: Request, res: Response) => {
  try {
    const logo = await deleteLogo(routeParam(req.params.id));
    if (!logo) {
      return res.status(404).send("Logo not found");
    }
    res.status(200).send("Logo deleted successfully");
  } catch (error) {
    console.error("Error deleting logo:", error);
    res.status(500).send("Failed to delete logo");
  }
};

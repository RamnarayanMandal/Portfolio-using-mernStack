import type { Request, Response } from "express";
import {
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getCertificateById,
  getAllCertificates,
} from "../services/certificateService.js";
import { HttpError } from "../types/errors.js";
import { routeParam } from "../utils/routeParams.js";

type MulterFiles = Record<string, Express.Multer.File[]>;

export const createCertificateHandler = async (req: Request, res: Response) => {
  try {
    const cert = await createCertificate(req.body, req.files as MulterFiles);
    res.status(201).json(cert);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      error: error instanceof Error ? error.message : "Failed to create certificate",
    });
  }
};

export const deleteCertificateHandler = async (req: Request, res: Response) => {
  try {
    const certificate = await deleteCertificate(routeParam(req.params.id));
    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete certificate" });
  }
};

export const updateCertificateHandler = async (req: Request, res: Response) => {
  try {
    const updated = await updateCertificate(
      routeParam(req.params.id),
      req.body,
      req.files as MulterFiles
    );
    res.status(200).json(updated);
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      error: error instanceof Error ? error.message : "Failed to update certificate",
    });
  }
};

export const getCertificateByIdHandler = async (req: Request, res: Response) => {
  try {
    const certificate = await getCertificateById(routeParam(req.params.id));
    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ error: "Failed to get certificate" });
  }
};

export const getAllCertificatesHandler = async (_req: Request, res: Response) => {
  try {
    const certificates = await getAllCertificates();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching certificates",
      error: error instanceof Error ? error.message : "",
    });
  }
};

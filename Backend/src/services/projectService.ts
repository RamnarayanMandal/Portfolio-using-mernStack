import type { Document } from "mongoose";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { projectRepository } from "../repositories/projectRepository.js";
import { HttpError } from "../types/errors.js";

export type ParseTechResult =
  | { ok: true; value: string[] }
  | { ok: false; error: string };

export function parseTechnologiesUsed(raw: unknown): ParseTechResult {
  if (raw === undefined || raw === null || raw === "") {
    return { ok: false, error: "technologiesUsed is required" };
  }
  if (Array.isArray(raw)) {
    return {
      ok: true,
      value: raw.map(String).filter((s) => s.trim() !== ""),
    };
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        return {
          ok: true,
          value: parsed.map(String).filter((s) => s.trim() !== ""),
        };
      }
      return { ok: false, error: "technologiesUsed must be an array" };
    } catch {
      return { ok: false, error: "Invalid JSON for technologiesUsed" };
    }
  }
  return { ok: false, error: "Invalid technologiesUsed" };
}

type FileFields = Record<string, Express.Multer.File[] | undefined>;

export async function createProjectWithFiles({
  body,
  files,
}: {
  body: Record<string, unknown>;
  files?: FileFields;
}) {
  const tech = parseTechnologiesUsed(body.technologiesUsed);
  if (!tech.ok) throw new HttpError(tech.error, 400);

  const imageUrls: string[] = [];
  if (files?.imageUrl?.length) {
    for (const file of files.imageUrl) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (!uploaded) {
        throw new HttpError("Failed to upload image to Cloudinary", 500);
      }
      imageUrls.push(uploaded.url);
    }
  } else {
    throw new HttpError("Image files are required", 400);
  }

  return projectRepository.create({
    name: body.name,
    description: body.description,
    role: body.role,
    technologiesUsed: tech.value,
    url: body.url,
    imageUrl: imageUrls,
    startDate: body.startDate,
    endDate: body.endDate,
    githubLink: body.githubLink || undefined,
    liveDemoLink: body.liveDemoLink || undefined,
    seoTitle: body.seoTitle || undefined,
    seoDescription: body.seoDescription || undefined,
    seoKeywords: body.seoKeywords || undefined,
  });
}

export async function updateProjectWithFiles({
  id,
  body,
  files,
  existing,
}: {
  id: string;
  body: Record<string, unknown>;
  files?: FileFields;
  existing: Document;
}) {
  const tech = parseTechnologiesUsed(body.technologiesUsed);
  if (!tech.ok) throw new HttpError(tech.error, 400);

  const newUrls: string[] = [];
  if (files?.imageUrl?.length) {
    for (const file of files.imageUrl) {
      const uploaded = await uploadOnCloudinary(file.path);
      if (!uploaded) {
        throw new HttpError("Failed to upload image to Cloudinary", 500);
      }
      newUrls.push(uploaded.url);
    }
  }

  const prevImages = Array.isArray(existing.get("imageUrl"))
    ? (existing.get("imageUrl") as string[])
    : [];
  const imageUrls =
    newUrls.length > 0 ? [...prevImages, ...newUrls] : prevImages;

  const patch: Record<string, unknown> = {
    name: body.name,
    description: body.description,
    role: body.role,
    technologiesUsed: tech.value,
    url: body.url,
    startDate: body.startDate,
    endDate: body.endDate,
    githubLink: body.githubLink,
    liveDemoLink: body.liveDemoLink,
    imageUrl: imageUrls,
  };
  if (body.seoTitle !== undefined) patch.seoTitle = body.seoTitle;
  if (body.seoDescription !== undefined)
    patch.seoDescription = body.seoDescription;
  if (body.seoKeywords !== undefined) patch.seoKeywords = body.seoKeywords;

  return projectRepository.findByIdAndUpdate(id, patch, {
    new: true,
    runValidators: true,
  });
}

export function listProjects() {
  return projectRepository.findAll();
}

export function getProjectById(id: string) {
  return projectRepository.findById(id);
}

export function deleteProjectById(id: string) {
  return projectRepository.findByIdAndDelete(id);
}

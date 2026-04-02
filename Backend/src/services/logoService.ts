import fs from "fs";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { logoRepository } from "../repositories/logoRepository.js";
import { HttpError } from "../types/errors.js";

export async function createLogo(
  files?: Record<string, Express.Multer.File[]>,
  body?: Record<string, unknown>
) {
  let logoLocalPath: string | null = null;
  if (files?.logo?.length) {
    logoLocalPath = files.logo[0].path;
  }
  if (!logoLocalPath) {
    throw new HttpError("Logo file is required", 400);
  }

  try {
    const newLogo = await uploadOnCloudinary(logoLocalPath);
    if (!newLogo?.url) {
      throw new HttpError("Upload failed", 500);
    }
    const { seoTitle, seoDescription, seoKeywords } = body || {};
    return logoRepository.create({
      logo: newLogo.url,
      seoTitle,
      seoDescription,
      seoKeywords,
    });
  } finally {
    if (logoLocalPath && fs.existsSync(logoLocalPath)) {
      fs.unlinkSync(logoLocalPath);
    }
  }
}

export async function updateLogo(
  id: string,
  files?: Record<string, Express.Multer.File[]>,
  body?: Record<string, unknown>
) {
  let logoLocalPath: string | null = null;
  if (files?.logo?.length) {
    logoLocalPath = files.logo[0].path;
  }

  const updatedLogo: Record<string, unknown> = {};
  try {
    if (logoLocalPath) {
      const newLogo = await uploadOnCloudinary(logoLocalPath);
      if (newLogo?.url) updatedLogo.logo = newLogo.url;
    }
    const { seoTitle, seoDescription, seoKeywords } = body || {};
    if (seoTitle !== undefined) updatedLogo.seoTitle = seoTitle;
    if (seoDescription !== undefined) updatedLogo.seoDescription = seoDescription;
    if (seoKeywords !== undefined) updatedLogo.seoKeywords = seoKeywords;

    const logo = await logoRepository.findByIdAndUpdate(id, updatedLogo);
    if (!logo) {
      throw new HttpError("Logo not found", 404);
    }
    return logo;
  } finally {
    if (logoLocalPath && fs.existsSync(logoLocalPath)) {
      fs.unlinkSync(logoLocalPath);
    }
  }
}

export const deleteLogo = (id: string) => logoRepository.findByIdAndDelete(id);
export const getAllLogos = () => logoRepository.findAll();

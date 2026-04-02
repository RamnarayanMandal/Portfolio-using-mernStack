import uploadOnCloudinary from "../utils/cloudinary.js";
import { educationRepository } from "../repositories/educationRepository.js";
import { HttpError } from "../types/errors.js";

export async function createEducation(
  body: Record<string, unknown> & {
    session?: { start?: string; end?: string };
    achievements?: unknown;
  },
  files?: Record<string, Express.Multer.File[]>
) {
  const {
    degree,
    specialization,
    instituteName,
    percentage,
    address,
    session,
    description,
    achievements,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = body;

  if (
    !degree ||
    !instituteName ||
    !percentage ||
    !session?.start ||
    !session?.end
  ) {
    throw new HttpError(
      "Degree, Institute Name, Percentage, and Session (start & end) are required.",
      400
    );
  }

  let imageLocalPath: string | null = null;
  if (files?.image?.length) {
    imageLocalPath = files.image[0].path;
  }
  if (!imageLocalPath) {
    throw new HttpError("Image file is required", 400);
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image?.url) {
    throw new HttpError("Image upload failed", 500);
  }

  return educationRepository.create({
    degree,
    specialization,
    instituteName,
    percentage,
    address,
    session,
    description,
    image: image.url,
    achievements: Array.isArray(achievements) ? achievements : [],
    seoTitle,
    seoDescription,
    seoKeywords,
  });
}

export async function updateEducation(
  id: string,
  body: Record<string, unknown>,
  files?: Record<string, Express.Multer.File[]>
) {
  const updateData: Record<string, unknown> = {};

  if (body.degree) updateData.degree = body.degree;
  if (body.specialization) updateData.specialization = body.specialization;
  if (body.instituteName) updateData.instituteName = body.instituteName;
  if (body.percentage) updateData.percentage = body.percentage;
  if (body.address) updateData.address = body.address;

  if (body.session && typeof body.session === "object") {
    const s = body.session as { start?: string; end?: string };
    updateData.session = {};
    if (s.start) (updateData.session as Record<string, unknown>).start = s.start;
    if (s.end) (updateData.session as Record<string, unknown>).end = s.end;
  }

  if (body.description) updateData.description = body.description;
  if (body.achievements && Array.isArray(body.achievements)) {
    updateData.achievements = body.achievements;
  }
  if (body.seoTitle !== undefined) updateData.seoTitle = body.seoTitle;
  if (body.seoDescription !== undefined)
    updateData.seoDescription = body.seoDescription;
  if (body.seoKeywords !== undefined) updateData.seoKeywords = body.seoKeywords;

  if (files?.image?.length) {
    const uploadedImage = await uploadOnCloudinary(files.image[0].path);
    if (uploadedImage?.url) updateData.image = uploadedImage.url;
  }

  if (Object.keys(updateData).length === 0) {
    throw new HttpError("No fields provided to update", 400);
  }

  const education = await educationRepository.findByIdAndUpdate(id, updateData);
  if (!education) {
    throw new HttpError("Education record not found", 404);
  }
  return education;
}

export const getAllEducation = () => educationRepository.findAll();
export const getEducationById = (id: string) =>
  educationRepository.findById(id);
export const deleteEducation = (id: string) =>
  educationRepository.findByIdAndDelete(id);

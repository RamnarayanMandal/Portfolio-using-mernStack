import uploadOnCloudinary from "../utils/cloudinary.js";
import { certificateRepository } from "../repositories/certificateRepository.js";
import { HttpError } from "../types/errors.js";

export async function createCertificate(
  body: Record<string, unknown>,
  files?: Record<string, Express.Multer.File[]>
) {
  let imageLocalPath: string | null = null;
  if (files?.image?.length) {
    imageLocalPath = files.image[0].path;
  }
  if (!imageLocalPath) {
    throw new HttpError("Image file is required", 400);
  }

  const imageUploadResult = await uploadOnCloudinary(imageLocalPath);
  if (!imageUploadResult) {
    throw new HttpError("Failed to upload image to Cloudinary", 500);
  }

  const url = (imageUploadResult as { secure_url?: string; url?: string })
    .secure_url || imageUploadResult.url;

  return certificateRepository.create({
    name: body.name,
    description: body.description,
    session: {
      start: body.startDate,
      end: body.endDate,
    },
    organization: body.organization,
    issuedDate: body.issuedDate,
    image: url,
    seoTitle: body.seoTitle,
    seoDescription: body.seoDescription,
    seoKeywords: body.seoKeywords,
  });
}

export async function updateCertificate(
  id: string,
  body: Record<string, unknown>,
  files?: Record<string, Express.Multer.File[]>
) {
  let imageUrl = body.image as string | undefined;

  if (files?.image?.length) {
    const filePath = files.image[0].path;
    const result = await uploadOnCloudinary(filePath);
    if (result) {
      imageUrl =
        (result as { secure_url?: string }).secure_url || result.url;
    }
  }

  const updated = await certificateRepository.findByIdAndUpdate(id, {
    ...body,
    image: imageUrl,
  });
  if (!updated) {
    throw new HttpError("Certificate not found", 404);
  }
  return updated;
}

export const deleteCertificate = (id: string) =>
  certificateRepository.findByIdAndDelete(id);

export const getCertificateById = (id: string) =>
  certificateRepository.findById(id);

export const getAllCertificates = () => certificateRepository.findAll();

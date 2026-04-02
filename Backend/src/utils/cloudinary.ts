import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dpxo55dbc",
  api_key: "698239919572654",
  api_secret: "qF5DmPwkKSsfOGcNMfy53Wv752c",
});

type UploadOptions = {
  folder?: string;
  resource_type?: "image" | "video" | "raw" | "auto";
};

const uploadOnCloudinary = async (
  localFilePath: string,
  options?: UploadOptions
): Promise<{ url: string } | null> => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: options?.resource_type ?? "auto",
      ...options,
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

export default uploadOnCloudinary;

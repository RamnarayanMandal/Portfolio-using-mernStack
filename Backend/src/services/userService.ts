import fs from "fs";
import path from "path";
import type { Types } from "mongoose";
import { StatusCodes } from "http-status-codes";
import { userRepository } from "../repositories/userRepository.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { HttpError } from "../types/errors.js";

type UserLike = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phoneNo?: number;
  title?: string;
  bio?: string;
  address?: string;
  image?: string;
  socialMedia?: unknown;
  comparePassword: (p: string) => Promise<boolean>;
  createJWT: () => string;
};

export async function signupUser(body: Record<string, unknown>) {
  const { name, email, password, phoneNo, title, Bio, address, socialMedia } =
    body;

  if (!name || !email || !password) {
    throw new HttpError(
      "Name, Email, and Password are required.",
      StatusCodes.BAD_REQUEST
    );
  }

  const existingUser = await userRepository.findByEmail(email as string);
  if (existingUser) {
    throw new HttpError(
      "Email already registered. Please use a different one.",
      StatusCodes.CONFLICT
    );
  }

  const newUser = (await userRepository.create({
    name,
    email,
    password,
    phoneNo,
    title,
    bio: Bio,
    address,
    socialMedia,
  })) as unknown as UserLike;

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phoneNo: newUser.phoneNo,
    title: newUser.title,
    Bio: newUser.bio,
    address: newUser.address,
    socialMedia: newUser.socialMedia,
  };
}

export async function loginUser(body: { email?: string; password?: string }) {
  const { email, password } = body;
  if (!email || !password) {
    throw new HttpError("Email and password required", 400);
  }

  const user = (await userRepository.findByEmail(email)) as UserLike | null;
  if (!user) {
    throw new HttpError("Invalid email or password (user not found)", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new HttpError("Invalid email or password (password mismatch)", 401);
  }

  const token = user.createJWT();

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      phoneNo: user.phoneNo,
      title: user.title,
      address: user.address,
      socialMedia: user.socialMedia,
    },
  };
}

export async function getUserById(userId: string) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new HttpError("User not found", 404);
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    phoneNo: user.phoneNo,
    title: user.title,
    address: user.address,
    socialMedia: user.socialMedia,
  };
}

export async function deleteUserById(userId: string) {
  const user = await userRepository.findByIdAndDelete(userId);
  if (!user) {
    throw new HttpError("User not found", 404);
  }
}

export async function updateUserById(
  userId: string,
  body: Record<string, unknown>,
  files?: Record<string, Express.Multer.File[]>
) {
  const {
    name,
    email,
    phoneNo,
    title,
    address,
    socialMedia,
    bio,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = body;

  const user = await userRepository.findById(userId);
  if (!user) {
    throw new HttpError("User not found", 404);
  }

  let imageLocalPath: string | null = null;
  if (files?.image?.length) {
    const tempDir = path.join(process.cwd(), "public", "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    imageLocalPath = files.image[0].path;
  }

  const updateData: Record<string, unknown> = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (phoneNo) updateData.phoneNo = phoneNo;
  if (title) updateData.title = title;
  if (address) updateData.address = address;
  if (socialMedia) updateData.socialMedia = socialMedia;
  if (bio) updateData.bio = bio;
  if (seoTitle !== undefined) updateData.seoTitle = seoTitle;
  if (seoDescription !== undefined) updateData.seoDescription = seoDescription;
  if (seoKeywords !== undefined) updateData.seoKeywords = seoKeywords;

  if (imageLocalPath) {
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    if (uploadedImage?.url) {
      updateData.image = uploadedImage.url;
    } else {
      throw new HttpError("Invalid response from image upload", 500);
    }
  }

  const updatedUser = await userRepository.findByIdAndUpdate(userId, updateData);
  return updatedUser;
}

export async function getPublicUser() {
  const users = await userRepository.findOne();
  return { users };
}

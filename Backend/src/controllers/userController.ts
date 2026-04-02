import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  signupUser,
  loginUser,
  getUserById,
  deleteUserById,
  updateUserById,
  getPublicUser,
} from "../services/userService.js";
import { HttpError } from "../types/errors.js";
import { routeParam } from "../utils/routeParams.js";

export const signupController = async (req: Request, res: Response) => {
  try {
    const user = await signupUser(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully.",
      user,
    });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({
      message: "Login successful!",
      ...result,
    });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: error instanceof Error ? error.message : "Error logging in",
    });
  }
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(routeParam(req.params.userId));
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: error instanceof Error ? error.message : "Error",
    });
  }
};

export const deleteUserByIdHandler = async (req: Request, res: Response) => {
  try {
    await deleteUserById(routeParam(req.params.userId));
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: error instanceof Error ? error.message : "Error",
    });
  }
};

export const updateUserByIdHandler = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUserById(
      routeParam(req.params.userId),
      req.body,
      req.files as Record<string, Express.Multer.File[]> | undefined
    );
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    res.status(status).json({
      message: error instanceof Error ? error.message : "Error",
    });
  }
};

export const getUser = async (_req: Request, res: Response) => {
  try {
    const data = await getPublicUser();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving users",
      error: error instanceof Error ? error.message : "",
    });
  }
};

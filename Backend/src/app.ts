import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoute.js";
import skillRoutes from "./routes/skillRoute.js";
import educationRoutes from "./routes/educationRoute.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import projectRoutes from "./routes/projectRoute.js";
import experienceRoutes from "./routes/experienceRoute.js";
import languageRoutes from "./routes/languageRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import logoRoutes from "./routes/logoRoutes.js";

export function createApp(): express.Application {
  const app = express();

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(cors());
  app.use(morgan("dev"));

  app.use("/api/users", userRoutes);
  app.use("/api/skills", skillRoutes);
  app.use("/api/educations", educationRoutes);
  app.use("/api/certificates", certificateRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/experiences", experienceRoutes);
  app.use("/api/languages", languageRoutes);
  app.use("/api/contactme", contactRoutes);
  app.use("/api/logo", logoRoutes);
  app.use("/api/blogs", blogRoutes);

  return app;
}

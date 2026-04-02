import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    technologiesUsed: { type: [String], required: true },
    url: { type: String, required: true, trim: true },
    imageUrl: { type: [String], trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    githubLink: { type: String },
    liveDemoLink: { type: String },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    seoKeywords: { type: String, trim: true },
  },
  { timestamps: false }
);

export default mongoose.model("Project", projectSchema);

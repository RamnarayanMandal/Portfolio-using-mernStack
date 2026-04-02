import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    session: {
      startDate: { type: Date },
      endDate: { type: Date },
    },
    achievements: { type: [String], default: [] },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    seoKeywords: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);

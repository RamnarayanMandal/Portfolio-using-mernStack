import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  logo: { type: String },
  seoTitle: { type: String, trim: true },
  seoDescription: { type: String, trim: true },
  seoKeywords: { type: String, trim: true },
});

export default mongoose.model("logo", logoSchema);

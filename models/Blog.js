import { model, models, Schema } from "mongoose";

const BlogSchema = new Schema({
  title: { type: String, required: true },
  titleEng: { type: String, required: true },
  subtitle: { type: String },
  subtitleEng: { type: String },
  description: { type: String },
  descriptionEng: { type: String },
  images: { type: [String] },
  date: { type: Date },
  location: { type: String },
});

export const Blog = models?.Blog || model("Blog", BlogSchema);

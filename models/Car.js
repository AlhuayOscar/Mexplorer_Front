import mongoose, { model, Schema, models } from "mongoose";

const CarSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    images: [{ type: String }],
    contact: String,
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
  },
  {
    timestamps: true,
  }
);

export const Car = models.Car || model("Car", CarSchema);

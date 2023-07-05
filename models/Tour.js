import { model, models, Schema } from "mongoose";

const TourSchema = new Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  reservation: { type: Boolean, required: true },
  reservationPrice: { type: Number },
  images: { type: [String] },
  includes: { type: [String] },
  requirements: { type: [String] },
  review: { type: [String] },
  notes: { type: [String] },
  promo: { type: Boolean, required: true },
  promoPrice: { type: Number },
});

export const Tour = models?.Tour || model("Tour", TourSchema);

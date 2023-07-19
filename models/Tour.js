import { model, models, Schema, mongoose } from "mongoose";

const TourSchema = new Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  duration: { type: Number, required: true },
  childrenPrice: { type: Number, required: true },
  adultsPrice: { type: Number, required: true },
  reservation: { type: Boolean, required: true },
  childrenReservationPrice: { type: Number },
  adultsReservationPrice: { type: Number },
  images: { type: [String] },
  includes: { type: [String] },
  doesntIncludes: { type: [String] },
  currency: { type: String },
  requirements: { type: [String] },
  review: { type: [String] },
  notes: { type: [String] },
  promo: { type: Boolean, required: true },
  withoutPromoPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export const Tour = models?.Tour || model("Tour", TourSchema);

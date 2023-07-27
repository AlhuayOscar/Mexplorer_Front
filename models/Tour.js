import { model, models, Schema } from "mongoose";

const TourSchema = new Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  duration: { type: Number, required: true },
  reservation: { type: Boolean, required: true },
  price: {
    mxn: {
      adultsPrice: { type: Number },
      childrenPrice: { type: Number },
      adultsReservationPrice: { type: Number },
      childrenReservationPrice: { type: Number },
      withoutPromoAdultsPrice: { type: Number },
      currency: { type: String, default: "MXN" },
    },
    usd: {
      adultsPrice: { type: Number},
      childrenPrice: { type: Number },
      adultsReservationPrice: { type: Number },
      childrenReservationPrice: { type: Number },
      withoutPromoAdultsPrice: { type: Number },
      currency: { type: String, default: "USD" },
    },
  },
  images: { type: [String] },
  includes: { type: [String] },
  requirements: { type: [String] },
  doesntIncludes: { type: [String] },
  review: { 
    total: { type: Number, default: 5 },
    quantity: { type: Number, default: 0 } },
  notes: { type: [String] },
  promo: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  unavailableDays: {type: [Number]},
  schedule: {type: [String]}
});

export const Tour = models?.Tour || model("Tour", TourSchema);

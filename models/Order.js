import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    kind: String,
    line_items: Object,
    name: String,
    lastname: String,
    date: String,
    email: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);

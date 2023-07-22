import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const { kind, name, lastname, email, tour, adults, children, price, date } = req.body;
  await mongooseConnect();

  const line_items = [
    {
      quantity: adults + children,
      price_data: {
        currency: "USD",
        product_data: { name: tour.name },
        unit_amount: price,
      },
    },
  ];

  const orderDoc = await Order.create({
    kind,
    name,
    lastname,
    email,
    adults,
    date,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  return res.json({
    url: session.url,
  });
}

import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const { kind, name, lastname, email, tour, persons, date } = req.body;
  console.log(req.body, "-------------------REQ.BODY-----------------------");
  await mongooseConnect();

  const line_items = [
    {
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: { name: tour.name },
        unit_amount: tour.reservationPrice * persons * 100,
      },
    },
  ];

  const orderDoc = await Order.create({
    kind,
    name,
    lastname,
    email,
    persons, 
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

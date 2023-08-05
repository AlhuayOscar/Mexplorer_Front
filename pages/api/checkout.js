import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);
const nodemailer = require("nodemailer");
const { EMAIL_ADDRESS, PASSWORD_EMAIL } = process.env;


export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const { kind, name, lastname, email, cartTours, currency } = req.body;
  console.log(req.body)
  await mongooseConnect();
  const toursIds = cartTours.map((tour) => tour.id);
  const uniqueIds = [...new Set(toursIds)];
  const toursInfos = await Tour.find({ _id: uniqueIds });
  function sumarPreciosTours(cartTours) {
    const total = cartTours.reduce((acumulador, tour) => {
      return acumulador + tour.price;
    }, 0);
    return total;
  }
  const price = sumarPreciosTours(cartTours);
  
  let line_items = [];
  for (const tourId of uniqueIds) {
    const tourInfo = toursInfos.find((p) => p._id.toString() === tourId);
    const quantity = toursIds.filter((id) => id === tourId)?.length || 0;
    if (quantity > 0 && tourInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: tourInfo.name },
          unit_amount: price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    kind,
    name,
    lastname,
    email,
    cartTours,
    line_items,
    paid: false,
  });
  console.log(orderDoc);
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: {
      orderId: orderDoc._id.toString(),
      test: "ok",
      cartTours: JSON.stringify(cartTours),
    },
  });

    return res.json({
      url: session.url,
    });
  }


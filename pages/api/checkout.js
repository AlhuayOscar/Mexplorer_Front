import {mongooseConnect} from "@/lib/mongoose";
import {Tour} from "@/models/Tour";
import {Order} from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req,res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name,email,city,
    postalCode,streetAddress,country,
    cartTours,
  } = req.body;
  await mongooseConnect();
  const toursIds = cartTours;
  const uniqueIds = [...new Set(toursIds)];
  const toursInfos = await Tour.find({_id:uniqueIds});

  let line_items = [];
  for (const tourId of uniqueIds) {
    const tourInfo = toursInfos.find(p => p._id.toString() === tourId);
    const quantity = toursIds.filter(id => id === tourId)?.length || 0;
    if (quantity > 0 && tourInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          tour_data: {name:tourInfo.title},
          unit_amount: quantity * tourInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,name,email,city,postalCode,
    streetAddress,country,paid:false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString(),test:'ok'},
  });

  res.json({
    url:session.url,
  })

}
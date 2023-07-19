import { mongooseConnect } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
const nodemailer = require("nodemailer");
const { EMAIL_ADDRESS, PASSWORD_EMAIL } = process.env;
import { buffer } from "micro";
import { Order } from "@/models/Order";

const endpointSecret =
  "whsec_bFkacENUxDSKc1LvoyedX1mBXSkonVPp";

export default async function handler(req, res) {
  await mongooseConnect();
  console.log(
    req.headers,
    "--------------------------HEADERS---------------------------------"
  );
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      console.log(
        "-----------------------------------------------------------"
      );
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
        const order = await Order.findById(orderId);
        const config = {
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: EMAIL_ADDRESS,
            pass: PASSWORD_EMAIL,
          },
        };

        const mensaje = {
          from: EMAIL_ADDRESS,
          to: order.email,
          subject: "Confirmación de compra",
          html: `
          <head>
            <div style="background-color: black; padding: 10px 20px; text-align: center;">
              <img src="" alt="Mexplorer logo" style="max-width: 400px;">
            </div>
            <title>Confirmación de compra</title>
          </head>
          <body>
            <h2>Confirmación de compra</h2>
      
            <p>Estimado,</p>
      
            <p>¡Gracias por elegir Mexplorer para tu próxima aventura!</p>
            <p>Estamos emocionados de confirmar tu compra del siguiente tour:</p>
      
            <h3>Tour: Nombre del Tour</h3>
            <p><strong>Duración:</strong> 3 horas</p>
            <p><strong>Fecha y Hora:</strong> 25 de Julio de 2023, 10:00 AM</p>
            <p><strong>Precio:</strong> $100 USD</p>
      
            <p>Si necesitas realizar algún cambio en tu reserva o tienes alguna pregunta, no dudes en contactarnos.</p>
      
            <p>Esperamos que disfrutes de una experiencia inolvidable con Mexplorer. ¡Nos vemos pronto!</p>
      
            <p>Atentamente,</p>
            <p>El equipo de Mexplorer</p>
          </body>`,
      };
        const transport = nodemailer.createTransport(config);

        const info = await transport.sendMail(mensaje);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};

// bright-thrift-cajole-lean
// acct_1Lj5ADIUXXMmgk2a

import { mongooseConnect } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
const nodemailer = require("nodemailer");
import { buffer } from "micro";
import { Order } from "@/models/Order";
const { EMAIL_ADDRESS, PASSWORD_EMAIL, ENDPOINT_SECRET } = process.env;

const endpointSecret = "whsec_sO0s7656H1Raj4jfhjkLKqqYTq2wKo37";

export default async function handler(req, res) {
  await mongooseConnect();
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
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      const email = data.customer_details.email;
      const cartTours = JSON.parse(data.metadata.cartTours);
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
        const order = await Order.findById(orderId);

        let cartToursHTML = "";
        cartTours.forEach((tour) => {
          cartToursHTML += `<li>Nombre: ${tour.name}, Tipo: ${tour.type}, Adultos: ${tour.adults}, Niños: ${tour.children}, Fecha: ${tour.date}, Hora: ${tour.hour}, Precio: ${tour.price}</li>`;
        });
        console.log(cartToursHTML)

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
          to: email,
          subject: "Confirmación de compra",
          html: `
            <div style="background-color: black; padding: 10px 20px; text-align: center;">
                <img src="https://images-ext-1.discordapp.net/external/167yebapLpiCo4oAK1cqRdnFesSMFREm4EQcxntPqUE/https/res.cloudinary.com/dipn8zmq3/image/upload/v1689787975/001_MEXPLORER_LOGO_PNG_Original_yydnze.png?width=499&height=499" alt="urbanClub! Logo" style="max-width: 400px;">
            </div>
            <title>Confirmación de compra</title>
            </head>
            <body>

            <p>Estimado ${order.name},</p>
        
            <p>¡Gracias por tu compra en Mexplorer! A continuación, te proporcionamos los detalles de tus tours:</p>
        
            <ol>
            ${cartToursHTML}
            </ol>
            
            
                <p>¡Gracias por tu atención y continuo apoyo!</p>
            
                <p>Atentamente,</p>
                <p>Mexplorer</p>
                <p>Equipo de Soporte Técnico</p>
            </body>`,
        };
        const transport = nodemailer.createTransport(config);

        const info = await transport.sendMail(mensaje);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};

// bright-thrift-cajole-lean
// acct_1Lj5ADIUXXMmgk2a

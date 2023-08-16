import { mongooseConnect } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
const nodemailer = require("nodemailer");
import { buffer } from "micro";
import { Order } from "@/models/Order";
const { EMAIL_ADDRESS, PASSWORD_EMAIL, ENDPOINT_SECRET } = process.env;

const endpointSecret = "whsec_QAruocsrzd3asSYxKwtrkImnfBbX3nNX";

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
          cartToursHTML += `<li>Nombre: ${tour.name}, Tipo: ${tour.type}, Adultos: ${tour.adults}, Niños: ${tour.children}, Fecha: ${order.date}, Hora: ${tour.hour}, Precio: ${tour.price}</li>`;
        });
        console.log(cartToursHTML)

        const config = {
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: "alanquimeywinkler@gmail.com",
            pass: "dyfxenijhfbyxtqt",
          },
        };

        const mensaje = {
          from: "alanquimeywinkler@gmail.com",
          to: email,
          subject: "Confirmación de compra",
          html: `
            <div style="background-color: black; padding: 10px 20px; text-align: center;">
                <img src="https://images-ext-1.discordapp.net/external/167yebapLpiCo4oAK1cqRdnFesSMFREm4EQcxntPqUE/https/res.cloudinary.com/dipn8zmq3/image/upload/v1689787975/001_MEXPLORER_LOGO_PNG_Original_yydnze.png?width=499&height=499" alt="urbanClub! Logo" style="max-width: 400px;">
            </div>
            <title>Confirmación de compra</title>
            </head>
            <body>
            
            <p>Estimado(a) ${order.name},</p>
        
            <p>¡Saludos desde Mexplorer Tours Cancún! Estamos emocionados de confirmar tu reserva y participación en una experiencia inolvidable llena de descubrimiento y diversión. ¡Prepárate para sumergirte en la belleza única de Cancún y crear recuerdos que durarán toda la vida! </p>

            <p>A continuación, te proporcionamos los detalles de tus tours:</p>
        
            <ol>
            ${cartToursHTML}
            </ol>
            
            <p>Nuestro equipo está comprometido en brindarte un servicio excepcional y una atención personalizada en cada paso del camino.</p>

            <p>No dudes en contactarnos si tienes alguna pregunta adicional o requisitos especiales antes de tu aventura. Puedes comunicarte directamente con nuestro equipo de atención al cliente al WhatsApp +52 1 998 759 9673 </p>

            <p>Te recomendamos que llegues al punto de encuentro con al menos 15 minutos de anticipación para que podamos comenzar puntualmente y aprovechar al máximo esta emocionante jornada.</p>

            <p>¡Desde ahora, considera a Mexplorer Tours Cancún como tu compañero en la exploración de maravillas locales!</p>

            <p>Esperamos verte pronto y compartir contigo momentos inolvidables.</p>

            <p>¡Hasta pronto y que comience la aventura!</p>

            <p>¡Gracias por tu atención y continuo apoyo!,</p>
            <p>Mexplorer Tours Cancún,</p>
            <p>Equipo de Soporte Técnico</p>
            <p>Número de contacto: +52 1 998 759 9673</p>
            <p>Email de contacto: mexplorer.ok@gmail.com</p>
                
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

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
  await mongooseConnect();
  const toursIds = cartTours;
  const uniqueIds = [...new Set(toursIds)];
  const toursInfos = await Tour.find({ _id: uniqueIds });
  try {
    let line_items = [];
    for (const tourId of uniqueIds) {
      const tourInfo = toursInfos.find((p) => p._id.toString() === tourId);
      const quantity = toursIds.filter((id) => id === tourId)?.length || 0;
      if (quantity > 0 && tourInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: currency,
            product_data: { name: tourInfo.name },
            unit_amount: tourInfo.adultsPrice * 100,
          },
        });
        console.log(
          line_items,
          "LINE ITEMS----------------------------------------", tourInfo.adultsPrice
        );
      }
    }

    const orderDoc = await Order.create({
      kind,
      name,
      lastname,
      email,
      cartTours,
      line_items,
      currency,
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

    // const config = {
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   auth: {
    //     user: EMAIL_ADDRESS,
    //     pass: PASSWORD_EMAIL,
    //   },
    // };

    // const mensaje = {
    //   from: EMAIL_ADDRESS,
    //   to: "alanquimeywinkler@gmail.com",
    //   subject: "Confirmación de compra",
    //   html: `
    //   <div style="background-color: black; padding: 10px 20px; text-align: center;">
    //       <img src="https://media.discordapp.net/attachments/1097579150350487605/1105670284289249330/our_logo-removebg-preview.png" alt="urbanClub! Logo" style="max-width: 400px;">
    //   </div>
    //   <title>Recuperación de contraseña</title>
    //   </head>
    //   <body>
    //       <h2>Recuperación de contraseña</h2>
      
    //       <p>Estimado,</p>
      
    //       <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en nuestro sitio web. Para proceder con la recuperación de tu contraseña, por favor sigue los pasos a continuación:</p>
      
    //       <ol>
              
    //           <li>Serás redirigido a una página donde podrás crear una nueva contraseña. Asegúrate de elegir una contraseña segura y fácil de recordar.</li>
    //           <li>Una vez que hayas creado tu nueva contraseña, podrás acceder nuevamente a tu cuenta con las nuevas credenciales.</li>
    //       </ol>
    //       <p>Este link dura 5 minutos.</p>
    //       <p>Si no solicitaste este cambio o no deseas restablecer tu contraseña, te recomendamos tomar las siguientes medidas de seguridad:</p>
    //       <ul>
    //           <li>No hagas clic en el enlace proporcionado anteriormente.</li>
    //           <li>Cambia tu contraseña actual lo antes posible en la configuración de tu cuenta.</li>
    //           <li>Mantén tu cuenta segura utilizando contraseñas fuertes y únicas, evitando compartirlas con otras personas.</li>
    //       </ul>
      
    //       <p>¡Gracias por tu atención y continuo apoyo!</p>
      
    //       <p>Atentamente,</p>
    //       <p>urbanClub!</p>
    //       <p>Equipo de Soporte Técnico</p>
    //   </body>`,
    // };
    // const transport = nodemailer.createTransport(config);

    // const info = await transport.sendMail(mensaje);

    return res.json({
      url: session.url,
    });
  } catch (error) {
    console.log(error);
  }
}

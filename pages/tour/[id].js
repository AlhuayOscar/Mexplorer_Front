import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
export default function TourPage() {
  // Valores hardcodeados o variables sin usar el parámetro "tour"
  const tourName = "Tour de Aventura";
  const tourDescription =
    "Disfruta de una emocionante aventura en la naturaleza.";
  const tourDuration = "3 horas";
  const tourIncludes = ["Guía experto", "Equipo de seguridad", "Transporte"];
  const tourRequirements = ["Edad mínima: 12 años", "Buen estado físico"];
  const tourNotes = ["Traer ropa cómoda", "No llevar objetos de valor"];

  return (
    <>
      <Header />
      <div>
        <h1>{tourName}</h1>
        <p>{tourDescription}</p>
        <p>Duración: {tourDuration}</p>
        <h2>Incluye:</h2>
        <ul>
          {tourIncludes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h2>Requisitos:</h2>
        <ul>
          {tourRequirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h2>Notas:</h2>
        <ul>
          {tourNotes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const tour = await Tour.findById(id);
  const promoTours = await Tour.find({ promo: true }, null, { limit: 3 });
  return {
    props: {
      tour: JSON.parse(JSON.stringify(tour)),
      promoTours: JSON.parse(JSON.stringify(promoTours)),
    },
  };
}

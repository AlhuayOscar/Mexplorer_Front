import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Tour } from "@/models/Tour";
import { mongooseConnect } from "@/lib/mongoose";
import NewTours from "@/components/NewTours";
import Footer from "@/components/Footer";

export default function HomePage({ featuredTour, newTours, promoTours }) {
  return (
    <div>
      <Header />
      <Featured tour={featuredTour} />
      <NewTours tours={newTours} promo={promoTours} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredTourId = "640de2b12aa291ebdf213d48";
  await mongooseConnect();
  const featuredTour = await Tour.findById(featuredTourId);
  const newTours = await Tour.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  const promoTours = await Tour.find({ promo: true }, null);
  console.log(promoTours)
  return {
    props: {
      featuredTour: JSON.parse(JSON.stringify(featuredTour)),
      newTours: JSON.parse(JSON.stringify(newTours)),
      promoTours: JSON.parse(JSON.stringify(promoTours)),
    },
  };
}

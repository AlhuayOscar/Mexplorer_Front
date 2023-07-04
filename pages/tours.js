import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import Title from "@/components/Title";
import ProductBoxH from "@/components/ToursBoxH";



export default function ToursPage({ tours }) {
  return (
    <>
      <Header />
      <Center>
          <Title>Todos los tours</Title>
        {tours?.map( product => (
            <ProductBoxH key={product._id} {...product}/>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const tours = await Tour.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      tours: JSON.parse(JSON.stringify(tours)),
    },
  };
}

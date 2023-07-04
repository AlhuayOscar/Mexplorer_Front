import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import ToursGrid from "@/components/ToursGrid";
import Title from "@/components/Title";

export default function ToursPage({ tours }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Autos de todos los modelos</Title>
        <ToursGrid tours={tours} />
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

import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import TourBoxH from "@/components/ToursBoxH";
import Filters from "@/components/Filters";

const ImageBox = styled.div`
  background: url("https://res.cloudinary.com/simpleview/image/upload/v1571158080/clients/quintanaroo/Intercontinental_Cancun_3_231b1843-c2bd-4fa8-b4b6-56cb64a30f39.jpg")
    no-repeat center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 18rem;
  text-align: center;
  margin: auto;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Agregado efecto de sombra de texto */
  
  /* position: relative; */
  img {
    width: 100%;
    height: 140%;
  }
`;

const Title = styled.div`
  font-size: 6rem;
  color: #fff;
  vertical-align: middle;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const ToursBox = styled.div`
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 70%;
  }
`;

export default function ToursPage({ tours }) {
  return (
    <>
      <Header />
      <ImageBox>
        <Title>Cancún</Title>
      </ImageBox>
      <Center>
        <h2>Todos los tours</h2>
        <Main>
          <Filters />
          <ToursBox>
            {tours?.map((product) => (
              <TourBoxH key={product._id} {...product} />
            ))}
          </ToursBox>
        </Main>
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

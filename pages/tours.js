import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import Filters from "@/components/Filters";
import { useState } from "react";
import PaginatedTourList from "@/components/PaginatedTourList";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
const ImageBox = styled.div`
  background: url("https://res.cloudinary.com/dipn8zmq3/image/upload/v1690990359/Tours_Background_Optimized_fovkvm.webp")
    no-repeat center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 18rem;
  text-align: center;
  margin: auto;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Agregado efecto de sombra de texto */
  padding: 0 40px;
  margin-bottom: 40px;
  /* position: relative; */
  img {
    width: 100%;
    height: 140%;
  }

  h2 {
    color: #fff;
    align-self: start;
    justify-self: flex-end;
    margin-top: 40px;
  }
`;

const Title = styled.div`
  margin-top: 80px;
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
  const { t } = useTranslation();
  const [filteredTours, setFilteredTours] = useState(tours);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFiltersChange = (filteredTours) => {
    setFilteredTours(filteredTours);
  };

  return (
    <>
      <Header />
      <ImageBox loading="lazy">
        <Title>Cancún</Title>
        <h2>{t("Todos los tours")} {tours.length}</h2>
      </ImageBox>
      <Center>
        <Main>
          <Filters
            tours={tours}
            onFiltersChange={handleFiltersChange}
            setCurrentPage={setCurrentPage}
          />
          <ToursBox>
            <PaginatedTourList
              tours={filteredTours}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </ToursBox>
        </Main>
      </Center>
      <Footer />
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

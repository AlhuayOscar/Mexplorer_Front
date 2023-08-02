import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import { Tour } from "@/models/Tour";
import { mongooseConnect } from "@/lib/mongoose";
import NewTours from "@/components/NewTours";
import Spinner from "react-spinner";
import LoadingComponent from "@/components/LoadingComponent";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const slideDownAnimation = keyframes`
  0% {
    opacity: 0.9;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 120px;
  z-index: 25;
`;
const slideDownAndBackAutoAnimation = keyframes`
  0%, 100% {
    transition: 0.2s ease 1.5s;
    opacity: 1;
    transform: translateY(0); 
    transform: scale(1.5);
  }
  25%, 75% {
    transition: 0.2s ease 4.5s;
    opacity: 0.2;
    transform: scale(0.5);
    transform: translateY(15%); 
  }
`;
//NO COLOCAR SLIDEDOWN ADELANTE DE BUTTONABOVEFEATURED.
const ButtonAboveFeatured = styled.button`
  position: absolute; //Encontrar la forma de volverlo stickya todo el header y el boton
  top: 5px;
  left: 45%;
  padding: 6px 20px;
  background-color: #ffffff02;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 24px;
  z-index: 17;
  transition: opacity 0.3s ease-out 1.3s; /* Agregamos la transición de opacidad */
  transition: 0.4s ease;
  opacity: 0.1; /* Establecemos la opacidad inicial */
  outline: none;
  animation: ${slideDownAndBackAutoAnimation} 8s ease-in-out infinite; /* Agregamos la nueva animación y establecemos la duración de 8 segundos */
  @media (max-width: 768px) {
    /* Aplicamos el cambio de tamaño para pantallas menores o iguales a 768px */
    font-size: 40px;
    padding: 1px 20px;
  }
  @media (max-width: 600px) {
    /* Aplicamos el cambio de tamaño para pantallas menores o iguales a 768px */
    padding: 1px 20px;
    left: 37%;
  }
  @media (max-width: 400px) {
    /* Aplicamos el cambio de tamaño para pantallas menores o iguales a 768px */
    left: 41%;
  }
  &:hover {
    transform: scale(1.15);
    transition: 0.4s ease;
    background-color: #fdffff05;
    opacity: 0.8; /* Cambiamos la opacidad cuando el cursor esté cerca */
  }

  /* Esta parte es opcional, si deseas que el botón esté siempre semi-transparente */
  /* &:not(:hover) {
    opacity: 0.5;
  } */
`;
const AnimatedHeaderWrapper = styled.div`
  position: relative;
  transition: 0.5s ease;
  animation: ${slideDownAnimation} 0.5s ease;
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
  z-index: 30;
  animation: ${(props) =>
      props.loading ? slideDownAnimation : fadeOutAnimation}
    0.5s linear;
  animation-fill-mode: forwards;
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

const ArrowIcon = styled(KeyboardDoubleArrowDownIcon)`
  font-size: 24px;

  @media (max-width: 600px) {
    font-size: 54px;
  }
  @media (max-width: 400px) {
    font-size: 24px;
  }
`;

export default function HomePage({ featuredTour, newTours, promoTours }) {
  const [loading, setLoading] = useState(true);
  const [showLoadingContainer, setShowLoadingContainer] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonText, setButtonText] = useState("^");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 55000);

    const hideLoadingTimer = setTimeout(() => {
      setShowLoadingContainer(false);
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideLoadingTimer);
    };
  }, []);

  const handleShowHeader = () => {
    setHeaderVisible(!headerVisible);
    setButtonText(headerVisible ? "^" : "v");
  };

  return (
    <div>
      {showLoadingContainer && (
        <LoadingContainer loading={loading} show={showLoadingContainer}>
          <LoadingComponent />
        </LoadingContainer>
      )}
      {headerVisible && (
        <AnimatedHeaderWrapper>
          <Header />
        </AnimatedHeaderWrapper>
      )}
      <ButtonAboveFeatured onClick={handleShowHeader}>
        <ArrowIcon />
      </ButtonAboveFeatured>
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
  return {
    props: {
      featuredTour: JSON.parse(JSON.stringify(featuredTour)),
      newTours: JSON.parse(JSON.stringify(newTours)),
      promoTours: JSON.parse(JSON.stringify(promoTours)),
    },
  };
}

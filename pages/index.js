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

const ButtonAboveFeatured = styled.button`
  position: absolute; //Encontrar la forma de volverlo stickya todo el header y el boton
  top: 5px;
  left: 45%;
  padding: 10px 20px;
  background-color: #00abbd01;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  z-index: 17;
  transition: opacity 0.3s ease 1.3s; /* Agregamos la transición de opacidad */
  transition: 0.4s ease;
  opacity: 0.2; /* Establecemos la opacidad inicial */
  outline: none;

  &:hover {
    transform: scale(1.2);
    transition: 0.4s ease;
    background-color: #00abbd05;
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

export default function HomePage({ featuredTour, newTours, promoTours }) {
  const [loading, setLoading] = useState(true);
  const [showLoadingContainer, setShowLoadingContainer] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonText, setButtonText] = useState("^");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 60000);

    const hideLoadingTimer = setTimeout(() => {
      setShowLoadingContainer(false);
    }, 65000);

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
        {buttonText}
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

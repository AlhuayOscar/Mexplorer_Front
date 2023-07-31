import React from "react";
import styled, { keyframes } from "styled-components";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import { Tour } from "@/models/Tour";
import { mongooseConnect } from "@/lib/mongoose";
import NewTours from "@/components/NewTours";

// Definimos una animación de deslizamiento hacia abajo
const slideDownAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

// Creamos un nuevo componente estilizado para la imagen
const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  height: 70px;
  z-index: -1; /* Colocamos la imagen detrás del resto del contenido */
`;

// Creamos un nuevo componente estilizado con la animación aplicada
const AnimatedHeaderWrapper = styled.div`
  position: relative; /* Aseguramos que la posición sea relativa para que la imagen con posición absoluta esté contenida en este div */
  animation: ${slideDownAnimation} 3.5s ease;
`;

export default function HomePage({ featuredTour, newTours, promoTours }) {
  return (
    <div>
      <AnimatedHeaderWrapper>
        <Header />
      </AnimatedHeaderWrapper>
      <StyledImage src="/mex_logo.png" alt="Logo de México" fill="true" />
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

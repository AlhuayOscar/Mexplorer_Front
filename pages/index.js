import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import { Tour } from "@/models/Tour";
import { mongooseConnect } from "@/lib/mongoose";
import NewTours from "@/components/NewTours";
import Spinner from "react-spinner";

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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 120px;
  z-index: 9999; /* Colocamos la imagen encima de todo */
`;

// Creamos un nuevo componente estilizado con la animación aplicada
const AnimatedHeaderWrapper = styled.div`
  position: relative; /* Aseguramos que la posición sea relativa para que la imagen con posición absoluta esté contenida en este div */
  animation: ${slideDownAnimation} 8.5s ease;
`;

// Estilos para el contenedor de la pantalla de carga
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 1); /* Color marrón/negro opaco */
  z-index: 9998; /* Colocamos la pantalla de carga por encima del resto del contenido */
`;

export default function HomePage({ featuredTour, newTours, promoTours }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos una carga de datos, por ejemplo, espera 3 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && (
        <LoadingContainer>
          <svg>
            <g xmlns="http://www.w3.org/2000/svg" id="Mexplorer Logo">
              <g id="Mexplorer LOGO">
                <g id="Our X">
                </g>
                <g id="our O">
                </g>
                <g id="our L">
                </g>
                <g id="our M">
                </g>
                <g id="our E">
                </g>
                <g id="our R">
                </g>
                <g id="our E_2">
                </g>
                <g id="Slogan">
                </g>
                <g id="our R_2">
                </g>
                <g id="our P">
                </g>
              </g>
            </g>
          </svg>
          <Spinner color="#007BFF" />
        </LoadingContainer>
      )}
      <AnimatedHeaderWrapper>
        <Header />
      </AnimatedHeaderWrapper>
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

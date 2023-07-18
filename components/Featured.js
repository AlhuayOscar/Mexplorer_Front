import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "@/components/CartContext";
import { Carousel } from "react-responsive-carousel";
import Searchbar from "../pages/Searchbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  position: relative;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 5%;
  left: 2.5%;
  width: 95%;
  height: 90%;
  border-radius: 0.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  padding-inline: 20px;
  text-align: center;
  font-size: 48px;
  margin-bottom: 22px;

  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
  @media screen and (max-width: 528px) {
    font-size: 24px;
  }
  @media screen and (max-width: 390px) {
    font-size: 16px;
  }
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1); /* Agregado efecto de sombra de texto */
`;

const Subtitle = styled.h2`
  font-size: 20px;
  margin-bottom: 22px;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); /* Agregado efecto de sombra de texto */
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  @media screen and (max-width: 528px) {
    font-size: 12px;
  }
  @media screen and (max-width: 390px) {
    font-size: 10px;
  }
`;

export default function Featured({ tour }) {
  const [portadaUrls, setPortadaUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const { addTour } = useContext(CartContext);

  function addFeaturedToCart() {
    addTour(tour._id);
  }

  useEffect(() => {
    fetch("/api/urls")
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.length === 0) {
          console.error("No se encontraron URLs de Portada.");
          setLoading(false);
          return;
        }
        // Concatenar todas las URLs de "Portada" en un solo arreglo
        const portadaUrls = data.flatMap((item) => item.videoUrls);

        setPortadaUrls(portadaUrls);
        setLoading(false);
        console.log(data[0].urlName, data[0].videoUrls);
      })
      .catch((error) => {
        console.error("Error al obtener las URLs de Portada:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Bg>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <Carousel
          interval={2500}
          infiniteLoop={true}
          autoPlay={true}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
        >
          {portadaUrls.map((urls, index) => (
            <div key={index}>
              <video autoPlay loop muted width="100%" height="100%">
                <source src={urls} type="video/mp4" />
                Tu navegador no admite la reproducción de videos.
              </video>
            </div>
          ))}
        </Carousel>
      )}
      <Overlay>
        <Title>Vive experiencias únicas en paisajes únicos</Title>
        <Subtitle>
          ¡El mejor lugar para disfrutar tus vacaciones en todo Cancún!
        </Subtitle>
        <Searchbar value={searchValue} setPhrase={setSearchValue} />
      </Overlay>
    </Bg>
  );
}

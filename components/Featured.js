import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "@/components/CartContext";
import { Carousel } from "react-responsive-carousel";
import Searchbar from "@/pages/api/Searchbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useTranslation } from "react-i18next";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  position: relative;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.05);
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

export default function Featured() {
  const { t } = useTranslation();
  const [portadaUrls, setPortadaUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch("/api/urls")
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.length === 0) {
          console.error("No se encontraron URLs de Portada.");
          setLoading(false);
          return;
        }

        // Verificar si hay un valor "Portada" en el arreglo data[0].urlName
        const portadaIndex = data[0].urlName.findIndex(
          (item) => item === "Portada"
        );

        // Verificar si hay un valor "Portada" en el arreglo data[0].videoUrls
        const portadaUrls = data[0].videoUrls.reduce((acc, url, index) => {
          if (data[0].urlName[index] === "Portada") {
            acc.push(url);
          }
          return acc;
        }, []);

        // Setear el valor del estado portadaUrls
        setPortadaUrls(portadaUrls);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las URLs de Portada:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Bg>
      {loading ? (
        <div>{t("Cargando")}</div>
      ) : (
        <Carousel
          interval={4500}
          infiniteLoop={true}
          autoPlay={true}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          swipeable={false} 
        >
          {portadaUrls.map((urls, index) => (
            <div key={index}>
              <video autoPlay loop muted width="100%" height="100%">
                <source src={urls} type="video/mp4" />
                {t("Tu navegador no admite la reproducción de videos.")}
              </video>
            </div>
          ))}
        </Carousel>
      )}
      <Overlay>
        <Title>{t("Vive experiencias únicas en paisajes únicos")}</Title>
        <Subtitle>
          {t("El mejor lugar para disfrutar tus vacaciones en todo Cancún")}
        </Subtitle>
        <Searchbar value={searchValue} setPhrase={setSearchValue} />
      </Overlay>
    </Bg>
  );
}

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import styled from "styled-components";
import ImageCarousel from "@/components/ImageCarousel";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import ToursGrid from "@/components/ToursGrid";
import Title from "@/components/Title";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const AsyncImageCarousel = ({ images }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async (src) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      setLoaded(true);
    };

    const loadImages = async () => {
      const imagePromises = images.map((src) => loadImage(src));
      await Promise.all(imagePromises);
      setLoaded(true);
    };

    loadImages();
  }, [images]);

  return loaded ? (
    <ImageCarousel images={images} loading="lazy" />
  ) : (
    <div></div>
  );
};

const BackgroundImage = styled.div`
  background: url("https://1.bp.blogspot.com/-S1OoFg8xYM0/XRtWj4QBrPI/AAAAAAADNgk/t47SIvSsohQwQpYmfPaKEACOms9UqXargCLcBGAs/s1600/car-3904788_1920.jpg")
    no-repeat center;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
`;

const WhatsAppButton = styled.a`
  /* Estilos para el botón de WhatsApp */
  text-decoration: none;
  transition: 0.4s ease 0.2s;
  color: white;
`;

const Subtitle = styled.span`
  display: flex;
  font-size: 18px;
  margin-bottom: 22px;
  text-align: center;
  background-color: rgba(
    26,
    26,
    26,
    0.5
  ); /* Establece el color de fondo con transparencia */
  /* Agrega el filtro de caja */
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5);
  padding: 1em;
  border-radius: 10px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  @media screen and (max-width: 528px) {
    font-size: 12px;
  }
  @media screen and (max-width: 390px) {
    font-size: 10px;
  }
  transition: 0.4s ease;
  svg {
    transition: 0.3s ease;
  }
  &:hover {
    background-color: #1a1a1a;
    transform: scale(1.1);
    transition: 0.4s ease;
    cursor: pointer;
  }
  &:hover {
    svg {
      color: green;
      transform: scale(1.5);
      transition: 0.3s ease 0.2s;
    }
  }
`;

const TitleOverlay = styled(Title)`
  display: flex;
  color: white;
  border-radius: 10px;
  font-size: 48px;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Agregado efecto de sombra de texto */
  flex-direction: column;
  align-items: center;
  min-height: 65vh;
  justify-content: space-evenly;
`;

export default function ToursPage({ tours }) {
  const images = [
    "./car1.jpg",
    "./car2.jpg",
    "./car3.jpg",
    "./car4.jpg",
    "./car5.jpg",
    "./car6.jpg",
    "./car7.jpg",
    "./car8.jpg",
  ];

  return (
    <>
      <BackgroundImage>
        <AsyncImageCarousel images={images} />
        <TitleOverlay>
          Autos de todos los modelos
          <Subtitle>
            <WhatsAppButton href="https://wa.me/+5493794663468?text=Muy%20buenas!%20Te%20contacto%20desde%20MexplorerTours%20Para%20conocer%20la%20disponibilidad%20de%20los%20vehiculos%20%3A%29.">
              Necesita un vehículo? Contáctenos personalmenteㅤ
              <WhatsAppIcon />
            </WhatsAppButton>
          </Subtitle>
        </TitleOverlay>
      </BackgroundImage>
      <Header />
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

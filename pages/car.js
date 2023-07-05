import React, { useState } from "react";
import Header from "@/components/Header";
import styled from "styled-components";
import ImageCarousel from "@/components/ImageCarousel";
import Title from "@/components/Title";

const BackgroundImage = styled.div`
  background: url("https://1.bp.blogspot.com/-S1OoFg8xYM0/XRtWj4QBrPI/AAAAAAADNgk/t47SIvSsohQwQpYmfPaKEACOms9UqXargCLcBGAs/s1600/car-3904788_1920.jpg")
    no-repeat center;
  width: 100%;
  height: 100vh;
`;

const WhatsAppButton = styled.a`
  /* Estilos para el botón de WhatsApp */
`;
const Subtitle = styled.h2`
  font-size: 18px;
  margin-bottom: 22px;

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
export default function ProductsPage() {
  return (
    <>
      <Header />
      <BackgroundImage>
        <ImageCarousel />
        <Title>Autos de todos los modelos</Title>
        <Subtitle>
          <WhatsAppButton href="https://wa.me/+5493487477269?text=Muy%20buenas!%20Necesitar%C3%ADa%20saber%20la%20disponibilidad%20de%20su%20flota">
            Necesita un vehículo? Contáctenos personalmente
          </WhatsAppButton>
        </Subtitle>
      </BackgroundImage>
    </>
  );
}

import React from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    &:nth-child(2n) {
      flex-direction: column-reverse;
    }
  }
`;

const StyledSpan = styled.span`
  font-size: 20px;
  padding-inline: 3%;
  h1 {
    font-size: 35px;
  }
  @media (max-width: 1100px) {
    padding-block: 5%;
    padding-inline: 5vw;
  }

  h3 span {
    color: #ff5733; /* M */
    &:nth-child(2) {
      color: #daf7a6; /* e */
    }
    &:nth-child(3) {
      color: #c70039; /* x */
    }
    &:nth-child(4) {
      color: #7d3c98; /* p */
    }
    &:nth-child(5) {
      color: #2ecc71; /* l */
    }
    &:nth-child(6) {
      color: #ffc300; /* o */
    }
    &:nth-child(7) {
      color: #3498db; /* r */
    }
    &:nth-child(8) {
      color: #33ffd7; /* e */
    }
    &:nth-child(9) {
      color: #f08080; /* r */
    }
    &:nth-child(10) {
      color: #f0afaf; /* ! */
    }
  }
`;
const StyledSalute = styled.h2`
  font-weight: 600;
  max-width: 1200px;
  @media (max-width: 1100px) {
    padding-block: 5%;
  }
`;
const ResponsiveImage = styled.img`
  max-width: 700px;
  height: auto;
  @media (max-width: 1100px) {
    width: 100%;
  }
`;
const StyledMexplorer = styled.span`
  color: #ee2743; /* M */
  font-size: 50px; /* Add the font size here */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add the filter shadow here */
`;

const StyledE = styled.span`
  color: #ed2286; /* e */
  font-size: 50px; /* Add the font size here */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add the filter shadow here */
`;

const StyledX = styled.span`
  color: #eeb527; /* x */
  font-size: 50px; /* Add the font size here */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add the filter shadow here */
`;

const StyledP = styled.span`
  color: #ac2484; /* p */
  font-size: 50px; /* Add the font size here */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add the filter shadow here */
`;

const StyledL = styled.span`
  color: #84c441; /* l */
  font-size: 50px; /* Add the font size here */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add the filter shadow here */
`;

const StyledO = styled.span`
  color: #00abbd; /* o */
  font-size: 50px; /* Add the font size here */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add the filter shadow here */
`;

const StyledR1 = styled.span`
  color: #ee2743; /* r */
  font-size: 50px; /* Add the font size here */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add the filter shadow here */
`;

const StyledR2 = styled.span`
  color: #ed2286; /* e */
  font-size: 50px; /* Add the font size here */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add the filter shadow here */
`;

const StyledExclamation = styled.span`
  color: #eeb527; /* r */
  font-size: 50px; /* Add the font size here */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Add the filter shadow here */
`;

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Wrapper>
        <Content>
          <ImageWrapper>
            <StyledSpan>
              <h1>{t("Bienvenidos a Mexplorer")}</h1> {t("Descripcion1")}
            </StyledSpan>
            <ResponsiveImage
              src="https://res.cloudinary.com/dipn8zmq3/image/upload/w_700/v1689523265/4682_afcejf.jpg"
              alt="Logo de Mexplorer"
            />
          </ImageWrapper>
          <ImageWrapper>
            <ResponsiveImage
              src="https://res.cloudinary.com/dipn8zmq3/image/upload/w_700/v1689566787/2b9099e1-cefb-4d8e-976d-07589d62702a_theg2m.webp"
              alt="Imagen 2"
            />
            <StyledSpan>
              <h1>{t("Cancún es un paraíso tropical")} </h1> {t("Descripcion2")}
            </StyledSpan>
          </ImageWrapper>
          <ImageWrapper>
            <StyledSpan>
              <h1>{t("Creemos que viajar")}</h1> {t("Descripcion3")}
            </StyledSpan>
            <ResponsiveImage
              src="https://res.cloudinary.com/dipn8zmq3/image/upload/w_700/v1689566895/arrecife_de_coral_1_nyw8in.jpg"
              alt="Imagen 3"
            />
          </ImageWrapper>
          <ImageWrapper>
            <ResponsiveImage
              src="https://res.cloudinary.com/dipn8zmq3/image/upload/w_700/v1689566955/guia-de-viaje-a-cancun_fp4zex.jpg"
              alt="Imagen 4"
            />
            <StyledSpan>
              <h1>{t("Nuestro equipo de entusiastas")}</h1> {t("Descripcion4")}
            </StyledSpan>
          </ImageWrapper>
          <ImageWrapper>
            <StyledSpan>
              <h1>{t("Como parte de nuestro compromiso")}</h1> {t("Descripcion5")}
            </StyledSpan>
            <ResponsiveImage
              src="https://res.cloudinary.com/dipn8zmq3/image/upload/w_700/v1689567973/cancun-beach-ee4fb41c2f544d71807b371f6116ee56_ratbac.jpg"
              alt="Imagen 5"
            />
          </ImageWrapper>
          <br />
          <StyledSalute>
            {t("Gracias por elegirnos.")} <br />
            {t("Descripcion6")} <br />
            {t("¡Prepárate para descubrir la magia de Cancún con")}
            <br />
            <br />
            <br />
            <StyledMexplorer>M</StyledMexplorer>
            <StyledE>e</StyledE>
            <StyledX>x</StyledX>
            <StyledP>p</StyledP>
            <StyledL>l</StyledL>
            <StyledO>o</StyledO>
            <StyledR1>r</StyledR1>
            <StyledE>e</StyledE>
            <StyledR2>r</StyledR2>
            <StyledExclamation>!</StyledExclamation>
          </StyledSalute>
        </Content>
      </Wrapper>
      <Footer />
    </>
  );
};

export default About;

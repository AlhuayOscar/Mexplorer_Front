import React from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  max-width: 1500px;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const StyledSpan = styled.span`
  font-size: 20px;
  padding-inline: 5%;
  h1 {
    font-size: 35px;
  }
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

const About = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Content>
          <ImageWrapper>
            <StyledSpan>
              <h1>Bienvenidos a Mexplorer</h1> tu puerta de entrada para
              descubrir las maravillas de Cancún. Estamos dedicados a promover
              el turismo y ofrecer experiencias inolvidables en esta vibrante
              ciudad. Mexplorer te invita a explorar y disfrutar de todo lo que
              Cancún tiene para ofrecer.
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
              <h1>Cancún es un paraíso tropical </h1>ubicado en la costa noreste
              de la Península de Yucatán, en México. Con sus aguas cristalinas
              de color turquesa, playas de arena blanca y una abundante vida
              marina, Cancún se ha convertido en uno de los destinos turísticos
              más solicitados en el mundo. Ven y descubre la belleza natural y
              cultural de Cancún con Mexplorer.
            </StyledSpan>
          </ImageWrapper>
          <ImageWrapper>
            <StyledSpan>
              <h1>Creemos que viajar </h1>no se trata solo de hacer turismo,
              sino de sumergirse en la cultura local y crear recuerdos para toda
              la vida. Ya sea que estés interesado en explorar antiguas ruinas
              mayas, hacer snorkel en el Gran Arrecife Mesoamericano o disfrutar
              de la deliciosa gastronomía mexicana, Cancún ofrece algo para
              todos. En Mexplorer, te ayudaremos a planificar una experiencia
              única y personalizada que se ajuste a tus intereses y presupuesto.
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
              <h1>Nuestro equipo de entusiastas</h1>
              está dedicado a crear experiencias únicas y personalizadas para
              nuestros visitantes. Hemos seleccionado cuidadosamente una amplia
              gama de actividades, tours y alojamientos para satisfacer
              diferentes intereses y presupuestos. Permítenos ser tu guía
              mientras descubres los tesoros escondidos de Cancún y te embarcas
              en aventuras inolvidables. Mexplorer te ofrece una variedad de
              opciones emocionantes para que disfrutes al máximo de tu visita a
              Cancún.
            </StyledSpan>
          </ImageWrapper>
          <ImageWrapper>
            <StyledSpan>
              <h1>Como parte de nuestro compromiso </h1>con el turismo
              sostenible, Mexplorer apoya a las comunidades locales e
              iniciativas respetuosas con el medio ambiente. Creemos en
              preservar la belleza natural de Cancún para las futuras
              generaciones. Al elegir Mexplorer, no solo te embarcas en un viaje
              memorable, sino que también contribuyes a la preservación de este
              impresionante destino. Únete a nosotros y sé parte del turismo
              responsable en Cancún.
            </StyledSpan>
            <ResponsiveImage
              src="https://res.cloudinary.com/dipn8zmq3/image/upload/w_700/v1689567973/cancun-beach-ee4fb41c2f544d71807b371f6116ee56_ratbac.jpg"
              alt="Imagen 5"
            />
          </ImageWrapper>
          <br />
          <h2>
            Gracias por elegir Mexplorer. Te invitamos a explorar nuestro sitio
            web, navegar por nuestras ofertas y comenzar a planificar tus
            vacaciones de ensueño en Cancún. Permítenos ayudarte a crear una
            experiencia que te dejará recuerdos para toda la vida. ¡Prepárate
            para descubrir la magia de Cancún con Mexplorer!
          </h2>
        </Content>
      </Wrapper>
      <Footer />
    </>
  );
};

export default About;

import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Waves from "react-wavify";

const StyledFooter = styled.footer`
  min-height: 430px;
  background-color: #0b0000;
  padding: 20px;
  margin-top: 290px;
  color: white;
  position: relative; /* Añade esta propiedad para posicionar correctamente las ondas */
`;

const WavesContainer1 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -90px; /* Ajusta el valor según tu diseño para el primer wave */
  left: 0;
  right: 0;
  z-index: 2;
`;

const WavesContainer2 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -120px; /* Ajusta el valor según tu diseño para el segundo wave */
  left: 0;
  right: 0;
  z-index: 1;
`;

const WavesContainer3 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -150px; /* Ajusta el valor según tu diseño para el tercer wave */
  left: 0;
  right: 0;
  z-index: 0;
`;
const WavesContainer4 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -170px; /* Ajusta el valor según tu diseño para el tercer wave */
  left: 0;
  right: 0;
  z-index: 0;
`;
const WavesContainer5 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -190px; /* Ajusta el valor según tu diseño para el tercer wave */
  left: 0;
  right: 0;
  z-index: 0;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const FooterDescription = styled.div`
  text-align: center;
`;

const Logo = styled.a`
  text-decoration: none;
  margin-right: 20px;
`;

const StyledImage = styled.img`
  width: auto;
  max-height: 370px;
  max-width: 100%;
  @media (max-width: 968px) {
    max-height: 200px;
  }
`;

const FooterText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterLink = styled.a`
  margin-right: 10px;
  text-decoration: none;
  color: #fffffff0;
`;
const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-inline: 5px;
`;
const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const Footer = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    // Detén la animación y libera los recursos al desmontar el componente
    return () => {
      if (waveRef.current) {
        waveRef.current.pause();
      }
    };
  }, []);
  return (
    <>
      <StyledFooter>
        <WavesContainer1>
          <Waves
            ref={waveRef}
            fill="#0b0000" // Colore menos transparente para Waves número 2
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.2,
              points: 4,
              fill: 0b0000,
            }}
          />
        </WavesContainer1>
        <WavesContainer2>
          <Waves
            ref={waveRef}
            fill="rgba(0, 171, 189, 0.8)" // Colore menos transparente para Waves número 2
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.2,
              points: 4,
              fill: 0b0000,
            }}
          />
        </WavesContainer2>
        <WavesContainer3>
          <Waves
            ref={waveRef}
            fill="rgba(237, 34, 134, 0.6)" // Colore menos transparente para Waves número 3
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.2,
              points: 4,
              fill: 0b0000,
            }}
          />
        </WavesContainer3>
        <WavesContainer4>
          <Waves
            ref={waveRef}
            fill="rgba(238, 181, 71, 0.4)" // Colore menos transparente para Waves número 3
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.2,
              points: 4,
              fill: 0b0000,
            }}
          />
        </WavesContainer4>
        <WavesContainer5>
          <Waves
            ref={waveRef}
            fill="rgba(172, 36, 132, 0.3)" // Colore menos transparente para Waves número 3
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.2,
              points: 4,
              fill: 0b0000,
            }}
          />
        </WavesContainer5>
        <FooterContent>
          <FooterDescription>
            <p>(© Mexplorer 2023)</p>
            <CenteredContainer>
              <p>Síguenos</p>
              <a href="https://www.facebook.com/mexplorerdmc">
                <Icon src="facy.png" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/nicolasgomezsb/">
                <Icon src="insy.png" alt="Instagram" />
              </a>
              <a href="https://www.tripadvisor.com.ar/Attraction_Review-g150801-d19928813-Reviews-Mexplorer_Adventures-Oaxaca_Southern_Mexico.html">
                <Icon src="trippy.png" alt="TripAdvisor" />
              </a>
            </CenteredContainer>
            <p>
              Av. Bonampak 73, SM.3, M.10, Edificio Global Cancún Torre “B”. CP.
              77500, Cancún, México.
            </p>
            <p>
              En Mexplorer siempre estamos trabajando para mejorar nuestros
              precios y ofrecerle los mejores precios en los tours y actividades
              que ofrecemos.
            </p>
          </FooterDescription>

          <Logo href="/">
            <StyledImage
              src="/mexploreroffice.png"
              alt="Oficinas de la empresa"
            />
          </Logo>
        </FooterContent>
        <hr />
        <FooterText>
          <FooterLink href="/politica_privacidad">
            Política de Privacidad
          </FooterLink>
          /
          <FooterLink href="/politica_cancelacion">
            Política de Cancelación
          </FooterLink>
        </FooterText>
        <FooterText>
          Copyright© 2023 All Rights Reserved. Desarrollado por CtoP.
        </FooterText>
      </StyledFooter>
    </>
  );
};

export default Footer;

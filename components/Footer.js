import React, { useState, useEffect } from "react";
import styled, {css} from "styled-components";
import Waves from "react-wavify";
import Link from "next/link";
import Image from "next/image";

const StyledFooter = styled.footer`
  background-color: #0b0000;
  padding: 20px;
  margin-top: 230px;
  color: white;
  position: relative; /* Añade esta propiedad para posicionar correctamente las ondas */
`;

const WavesContainer1 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -100px; /* Ajusta el valor según tu diseño para el primer wave */
  left: 0;
  right: 0;
  z-index: 7;
`;

const WavesContainer2 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -120px; /* Ajusta el valor según tu diseño para el segundo wave */
  left: 0;
  right: 0;
  z-index: 6;
`;

const WavesContainer3 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -150px; /* Ajusta el valor según tu diseño para el tercer wave */
  left: 0;
  right: 0;
  z-index: 5;
`;
const WavesContainer4 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -170px; /* Ajusta el valor según tu diseño para el tercer wave */
  left: 0;
  right: 0;
  z-index: 4;
`;
const WavesContainer5 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -190px; /* Ajusta el valor según tu diseño para el tercer wave */
  left: 0;
  right: 0;
  z-index: 3;
`;
const WavesContainer6 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -210px; /* Ajusta el valor según tu diseño para el tercer wave */
  left: 0;
  right: 0;
  z-index: 2;
`;
const WavesContainer7 = styled.div`
  position: absolute;
  padding-top: 10px;
  top: -220px; /* Ajusta el valor según tu diseño para el tercer wave */
  left: 0;
  right: 0;
  z-index: 1;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 25px 0;
  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const FooterDescription = styled.div`
  text-align: center;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  
`;

const Logo = styled.a`
  text-decoration: none;
  margin-right: 20px;
  height: auto;
  max-height: 20rem;
  max-width: 100%;
  @media (max-width: 968px) {
    max-height: 450px;
  }
  @media (max-width: 468px) {
    max-height: 20%;
  }
  img {
   width: 100%;
   height: 100%;
  }
`;

const FooterText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterLink = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  color: #fffffff0;
  ${props => props.ctop && css`
    &:hover{
      text-decoration: underline;
      color: #eeb547;
    }
  `}
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
  const [socialUrls, setSocialUrls] = useState({
    whatsapp: "",
    facebook: "",
    instagram: "",
    tripadvisor: "",
  });

  useEffect(() => {
    fetch("/api/urls")
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.length === 0) {
          console.error("No se encontraron URLs de Portada.");
          return;
        }

        // Get the index of the target URLs in the data array
        const whatsappIndex = data[0].urlName.findIndex(
          (item) => item === "Whatsapp"
        );
        const facebookIndex = data[0].urlName.findIndex(
          (item) => item === "Facebook"
        );
        const instagramIndex = data[0].urlName.findIndex(
          (item) => item === "Instagram"
        );
        const tripadvisorIndex = data[0].urlName.findIndex(
          (item) => item === "Trip"
        );

        // Set the corresponding URLs in the state variable socialUrls
        setSocialUrls({
          whatsapp:
            whatsappIndex !== -1 ? data[0].videoUrls[whatsappIndex] : "",
          facebook:
            facebookIndex !== -1 ? data[0].videoUrls[facebookIndex] : "",
          instagram:
            instagramIndex !== -1 ? data[0].videoUrls[instagramIndex] : "",
          tripadvisor:
            tripadvisorIndex !== -1 ? data[0].videoUrls[tripadvisorIndex] : "",
        });
      })
      .catch((error) => {
        console.error("Error al obtener las URLs de Portada:", error);
      });
  }, []);

  return (
    <>
      <StyledFooter>
        <WavesContainer1>
          <Waves
            fill="#0b0000"
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.2,
              points: 3,
              fill: 0b0000,
            }}
          />
        </WavesContainer1>
        <WavesContainer2>
          <Waves
            fill="rgba(238, 39, 67, 0.9)"
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.4,
              points: 2,
              fill: 0b0000,
            }}
          />
        </WavesContainer2>
        <WavesContainer3>
          <Waves
            fill="rgba(237, 34, 134, 0.8)"
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.3,
              points: 3,
              fill: 0b0000,
            }}
          />
        </WavesContainer3>
        <WavesContainer4>
          <Waves
            fill="rgba(238, 181, 39, 0.7)"
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.2,
              points: 2,
              fill: 0b0000,
            }}
          />
        </WavesContainer4>
        <WavesContainer5>
          <Waves
            fill="rgba(172, 36, 132, 0.6)"
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.1,
              points: 3,
              fill: 0b0000,
            }}
          />
        </WavesContainer5>
        <WavesContainer6>
          <Waves
            fill="rgba(132, 196, 65, 0.5)"
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.3,
              points: 2,
              fill: 0b0000,
            }}
          />
        </WavesContainer6>
        <WavesContainer7>
          <Waves
            fill="rgba(0, 171, 189, 1)"
            paused={false}
            options={{
              height: 10,
              amplitude: 25,
              speed: 0.2,
              points: 3,
              fill: 0b0000,
            }}
          />
        </WavesContainer7>
        <FooterContent>
          <FooterDescription>
            <h3>(© Mexplorer 2023)</h3>
            <CenteredContainer>
              <p>Síguenos</p>
              <Link href={socialUrls.facebook}>
                <Icon
                  src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1689651875/facy_toglrc.png"
                  alt="Facebook"
                />
              </Link>
              <Link href={socialUrls.instagram}>
                <Icon
                  src="https://res.cloudinary.com/dipn8zmq3/image/upload/v1689651875/insy_lcdcik.png"
                  alt="Instagram"
                />
              </Link>
            </CenteredContainer>
            {/* <p>
              Av. Bonampak 73, SM.3, M.10, Edificio Global Cancún Torre “B”. CP.
              77500, Cancún, México.
            </p> */}
            <p>
              En Mexplorer siempre estamos trabajando para mejorar nuestros
              precios y ofrecerle los mejores precios en los tours y actividades
              que ofrecemos.
            </p>
          </FooterDescription>

          <Logo href="/">
            <Image
              src="/mex_logo.png"
              alt="Logo de Mexplorer"
              width={200}
              height={150}
            />
          </Logo>
        </FooterContent>
        <FooterText>
          <FooterLink href="/politica_privacidad">
            Política de Privacidad
          </FooterLink>
          /
          <FooterLink href="/politica_cancelacion">
            Política de Cancelación
          </FooterLink>
        </FooterText>
        <hr />
        <FooterText>
            <p>Copyright© 2023 All Rights Reserved. Desarrollado por <FooterLink href="https://www.linkedin.com/company/ctop-connect-to-people/" target="_blank" ctop>CtoP.</FooterLink></p>
        </FooterText>
      </StyledFooter>
    </>
  );
};

export default Footer;

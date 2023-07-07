import styled from "styled-components";

const StyledFooter = styled.footer`
  min-height: 430px;
  background-color: #0b0000;
  padding: 20px;
  color: white;
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
  return (
    <StyledFooter>
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
  );
};

export default Footer;

import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 430px;
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

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterDescription>
          <p>(© Mexplorer 2023)</p>
          <p>Síguenos</p>
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

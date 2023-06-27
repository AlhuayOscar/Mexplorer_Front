import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledHeader = styled.header`
  background-color: #1a1a1a;
  position: relative;
  z-index: 3;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  ${(props) => props.hideLogo && `display: none;`}
`;

const StyledImage = styled.img`
  width: auto;
  height: 70px;
`;

const StyledIcon = styled.img`
  width: auto;
  height: 25px;
  padding: 0px 0px;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  background-color: #1a1a1a;
  padding: 30px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  gap: 35px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 100px 40px 20px;
  background-color: #1a1a1a;

  @media screen and (min-width: 980px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  background-color: #1a1a1a;
  display: flex;
  color: ${(props) => props.color};
  text-decoration: none;
  padding: 10px 0;

  @media screen and (min-width: 980px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: ${(props) => (props.isFixed ? "fixed" : "static")};
  z-index: 3;
  top: 20px;
  right: 20px;

  @media screen and (min-width: 980px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [isNavButtonFixed, setIsNavButtonFixed] = useState(false);

  const handleNavButtonClick = () => {
    setMobileNavActive((prev) => !prev);
    setIsNavButtonFixed(false);
  };

  const handleNavMenuClose = () => {
    setMobileNavActive(false);
    setIsNavButtonFixed(false);
  };

  useEffect(() => {
    // Cierra el menú de navegación cuando se cambia de página
    handleNavMenuClose();
  }, []);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"} hideLogo={mobileNavActive}>
            <StyledImage src="/mex_logo.png" alt="Logo de México" fill />
          </Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"} color="#00ABBD">
              Blog
            </NavLink>
            <NavLink href={"/products"} color="#ED2286">
              Tours
            </NavLink>
            <NavLink href={"/categories"} color="#EEB547">
              Renta de Autos
            </NavLink>
            <NavLink href={"/account"} color="#AC2484">
              Renta de Jetski
            </NavLink>
            <NavLink href={"/account"} color="#84C441">
              Promociones
            </NavLink>
            <NavLink href={"/account"} color="#00ABBD">
              Sobre nosotros
            </NavLink>
          </StyledNav>
          <NavLink
            href={
              "https://www.tripadvisor.com.ar/Attraction_Review-g150801-d19928813-Reviews-Mexplorer_Adventures-Oaxaca_Southern_Mexico.html"
            }
            color="#00ABBD"
          >
            <StyledIcon src="/icons/trip.png" alt="Link a TripAdvisor" fill />
          </NavLink>
          <NavLink href={"https://www.instagram.com/nicolasgomezsb/"}>
            <StyledIcon src="/icons/insta.png" alt="Link a Instagram" fill />
          </NavLink>
          <NavLink href={"https://www.facebook.com/mexplorerdmc"}>
            <StyledIcon src="/icons/face.png" alt="Link a Facebook" fill />
          </NavLink>
          <NavLink href={"whatsapp://send?phone=+54 9 379 466-3468"}>
            <StyledIcon src="/icons/what.png" alt="Link a México" fill />
          </NavLink>
          <NavLink href={"/cart"} color="#fff">
            <ShoppingCartIcon /> ({cartProducts.length})
          </NavLink>
          <NavButton onClick={handleNavButtonClick} isFixed={isNavButtonFixed}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
      {mobileNavActive && <div onClick={handleNavMenuClose}></div>}
    </StyledHeader>
  );
}

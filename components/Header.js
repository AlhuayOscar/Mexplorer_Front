import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledHeader = styled.header`
  background-color: #1a1a1a;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const StyledImage = styled.img`
  width: auto;
  height: 70px;
`;
const StyledIcon = styled.img`
  width: auto;
  height: 25px;
  padding: 0px 5px;

  @media screen and (max-width: 600px) {
    //deberia ser 768 el normal
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
    //deberia ser 768 el normal
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
    //deberia ser 768 el normal
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
  position: relative;
  z-index: 3;
  @media screen and (min-width: 980px) {
    //deberia ser 768 el normal
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>
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
          <NavLink href={"/cart"} color="#fff">
            <StyledIcon src="/icons/trip.png" alt="Logo de Facebook" fill />
            <StyledIcon src="/icons/insta.png" alt="Logo de México" fill />
            <StyledIcon src="/icons/face.png" alt="Logo de México" fill />
            <StyledIcon src="/icons/what.png" alt="Logo de México" fill />
            <ShoppingCartIcon /> ({cartProducts.length})
          </NavLink>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

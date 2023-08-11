import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
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
  ${(props) =>
    props.mobileNavActive
      ? `
    z-index: 20;
  `
      : `
    z-index: 17;
  `}
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  outline: none;
  transition: 0.8s ease;
  display: ${(props) =>
    props.hidelogo === "false"
      ? "none"
      : "block"}; // Use a conditional expression to hide or show the logo

  @media screen and (max-width: 1300px) {
    transform: scale(0.48);
    transition: 0.4s ease;
    width: 10%;
  }
  @media screen and (max-width: 1000px) {
    transform: scale(0.4);
  }
  @media screen and (max-width: 980px) {
    transform: scale(0.6);
    transition: 0.4s ease;
    width: 15%;
    font-size: 15px;
  }
  @media screen and (max-width: 400px) {
    transform: scale(0.4);
  }
  @media screen and (max-width: 350px) {
    transform: scale(0.25);
  }
`;

const StyledImage = styled.img`
  width: auto;
  height: 70px;
`;

const StyledIcon = styled.img`
  width: auto;
  height: 25px;
  padding: 0px 0px;
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
  gap: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 100px 40px 20px;
  background-color: #1a1a1a;
  transition: 0.4s ease;
  @media screen and (min-width: 980px) {
    display: flex;
    position: static;
    padding: 0;
    align-items: center;
    transition: 0.4s ease;
  }

  @media screen and (max-width: 1090px) {
    font-size: 12px;
    transition: 0.4s ease;
  }
`;

const NavLink = styled(Link)`
  background-color: #1a1a1a;
  font-weight: 600;
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

const LanguageButton = styled.button`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 3px;
  display: ${(props) => (props.selected ? "none" : "block")};
  transition: transform 0.4s ease; /* Adding the transition property */
  &:hover {
    transform: scale(1.25); /* Scaling the button on hover */
  }
`;
const StyledLinks = styled.div`
  display: flex;
  gap: 15px;
  transition: 0.4s ease;
  @media screen and (max-width: 980px) {
    gap: 25px;
    transition: 0.4s ease;
  }
  @media screen and (max-width: 600px) {
    gap: 5px;
  }
  @media screen and (max-width: 540px) {
    display: none;
  }
`;
export default function Header() {
  const { t } = useTranslation();
  const { cartTours } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [isNavButtonFixed, setIsNavButtonFixed] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socialUrls, setSocialUrls] = useState({
    whatsapp: "",
    facebook: "",
    instagram: "",
    tripadvisor: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  const handleNavButtonClick = () => {
    setMobileNavActive((prev) => !prev);
    setIsNavButtonFixed((prev) => !prev); // Toggle the state
    setShowLinks(false); 
  };

  const handleNavMenuClose = () => {
    setMobileNavActive(false);
    setIsNavButtonFixed(false);
  };

  useEffect(() => {
    // Cierra el menú de navegación cuando se cambia de página
    handleNavMenuClose();
  }, []);

  useEffect(() => {
    fetch("/api/urls")
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.length === 0) {
          console.error("No se encontraron URLs de Portada.");
          setLoading(false);
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

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las URLs de Portada:", error);
        setLoading(false);
      });
  }, []);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"} hidelogo={mobileNavActive ? "false" : "true"}>
            <StyledImage src="/mex_logo.png" alt="Logo de México" fill="true" />
          </Logo>
          <StyledNav mobileNavActive={mobileNavActive} showLinks={showLinks}>
            <NavLink href={"/blog"} color="#00ABBD">
              Blog
            </NavLink>
            <NavLink href={"/tours"} color="#ED2286">
              {t("Tours")}
            </NavLink>
            <NavLink href={"/car"} color="#EEB547">
              {t("Renta de Autos")}
            </NavLink>
            <NavLink href={"/jetski"} color="#AC2484">
              {t("Renta de Jetski")}
            </NavLink>
            <NavLink href={"/about"} color="#00ABBD">
              {t("Sobre nosotros")}
            </NavLink>
            <LanguageButton
              selected={selectedLanguage === "es"}
              onClick={() => handleLanguageChange("es")}
            >
              <StyledIcon
                src="/icons/spain.png"
                alt="Traducción a español"
                fill="true"
              />
            </LanguageButton>
            <LanguageButton
              selected={selectedLanguage === "en"}
              onClick={() => handleLanguageChange("en")}
            >
              <StyledIcon
                src="/icons/united-states.png"
                alt="Traducción a inglés"
                fill="true"
              />
            </LanguageButton>
          </StyledNav>
          <StyledLinks>
            <NavLink
              href={socialUrls.tripadvisor}
              target="_blank"
              color="#00ABBD"
            >
              <StyledIcon
                src="/icons/trip.png"
                alt="Link a TripAdvisor"
                fill="true"
              />
            </NavLink>
            <NavLink href={socialUrls.instagram} target="_blank">
              <StyledIcon
                src="/icons/insta.png"
                alt="Link a Instagram"
                fill="true"
              />
            </NavLink>
            <NavLink href={socialUrls.facebook} target="_blank">
              <StyledIcon
                src="/icons/face.png"
                alt="Link a Facebook"
                fill="true"
              />
            </NavLink>
            <NavLink href={socialUrls.whatsapp} target="_blank">
              <StyledIcon
                src="/icons/what.png"
                alt="Link a México"
                fill="true"
              />
            </NavLink>
          </StyledLinks>

          <NavLink href={"/cart"} color="#fff">
            <ShoppingCartIcon /> ({cartTours.length})
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

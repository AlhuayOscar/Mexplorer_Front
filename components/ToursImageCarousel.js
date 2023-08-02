import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const HeaderSlider = styled(Slider)`
  display: flex;
  height: 300px;
  align-items: center;
  overflow: hidden;
  transition: 0.4s ease;
`;

const SlideImage = styled.img`
  height: 305px;
  object-fit: cover; /* Aplica el recorte */
  object-position: center; /* Centra la imagen en el recorte */
  transition: 0.4s ease 0.15s;

  @media screen and (min-width: 768px) {
    height: 380px;
  }
`;

const Carousel = ({ images }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Verificar si window está definido antes de suscribirse al evento resize
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const getNumberOfItemsToShow = () => {
    if (windowWidth >= 1000) {
      return 3;
    } else if (windowWidth >= 786) {
      return 2;
    } else {
      return 1;
    }
  };

  const showCards = getNumberOfItemsToShow();

  const settings = {
    dots: false,
    speed: 550,
    slidesToShow: showCards,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    /* arrows: true, */
  };

  return (
    <HeaderSlider {...settings}>
      {images.map((image, index) => (
        <SlideImage key={index} src={image} alt={`Imagen ${index}`} />
      ))}
    </HeaderSlider>
  );
};

export default Carousel;

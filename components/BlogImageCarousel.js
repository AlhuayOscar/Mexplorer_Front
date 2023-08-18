import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const HeaderSlider = styled(Slider)`
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: 0.4s ease;
  &:hover {
    transform: scale(1.05);
    transition: 0.4s ease;
    cursor: grab;
  }
`;

const SlideImage = styled.img`
  width: 400px;
  height: 500px;
  min-width:200px;
  min-height:200px;
  max-height:500px;
  object-fit: cover; /* Aplica el recorte */
  object-position: center; /* Centra la imagen en el recorte */
  transition: 0.4s ease;
  &:hover {
    transform: scale(1.05);
    transition: 0.4s ease;
    cursor: grab;
  }
`;

const Carousel = ({ images }) => {
  const [slidesNumber, setSlidesNumber] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document.getElementById("container").offsetWidth;
      if (containerWidth <= 400) {
        setSlidesNumber(1);
      } else if (containerWidth <= 800) {
        setSlidesNumber(1);
      } else if (containerWidth <= 1200) {
        setSlidesNumber(1);
      } else {
        setSlidesNumber(1);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 550,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    centerMode: true,
  };
  return (
    <div id="container">
      <HeaderSlider {...settings}>
        {images.map((image, index) => (
          <SlideImage key={index} src={image} alt={`Imagen ${index}`} />
        ))}
      </HeaderSlider>
    </div>
  );
};

export default Carousel;

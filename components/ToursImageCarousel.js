import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

/* const images = [
  "https://www.southernliving.com/thmb/opLh6q5S5cEOFPbXQ97h8A0UcyQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grayton-beach-car-beach-4089102_bronco_0855-copy-2000-b094709c1f6f4f4ea401bdadbefb0227.jpg",
  "https://us-east-1.linodeobjects.com/agirlsguidetocars/2018/05/GGTC-Beach-Photo-by-Lee-Cannon.jpg",
  "https://wallpapercave.com/wp/wp3635654.jpg",
  "https://lh5.googleusercontent.com/p/AF1QipOPeKDLXj1dbCXOYy1i7qkQdyRwiipOS2lq4txc=w1080-k-no",
  "https://memolira.com/wp-content/uploads/2018/08/cuida-tu-auto-si-vas-a-la-playa.jpg",
  "https://automundo.com.ar//wp-content/uploads/2020/12/Auto-playa-2.jpg",
  "https://www.southernliving.com/thmb/opLh6q5S5cEOFPbXQ97h8A0UcyQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grayton-beach-car-beach-4089102_bronco_0855-copy-2000-b094709c1f6f4f4ea401bdadbefb0227.jpg",
  "https://www.oneclickdrive.com/uploads/mobcars/Kia_Forte_2020_16850_16850_13069512875-1_small.jpg",
  "https://www.oneclickdrive.com/uploads/mobcars/Renault_Megane_2019_20630_20630_13228778405-2_small.jpg",
  "https://www.oneclickdrive.com/car-for-rent/mobile/Hyundai_Accent_2020_8100_-1%20(1)_small.jpg",
]; */

const HeaderSlider = styled(Slider)`
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: 0.4s ease;
  
  /* &:hover {
    transition: 0.4s ease;
    cursor: grab;
    overflow: hidden;
    padding-block: 10px;
  } */
`;

const SlideImage = styled.img`
  height: 300px;
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
    infinite: true,
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

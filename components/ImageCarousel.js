import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const images = [
  "https://www.southernliving.com/thmb/opLh6q5S5cEOFPbXQ97h8A0UcyQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grayton-beach-car-beach-4089102_bronco_0855-copy-2000-b094709c1f6f4f4ea401bdadbefb0227.jpg",
  "https://us-east-1.linodeobjects.com/agirlsguidetocars/2018/05/GGTC-Beach-Photo-by-Lee-Cannon.jpg",
  "https://wallpapercave.com/wp/wp3635654.jpg",
  "https://us-east-1.linodeobjects.com/agirlsguidetocars/2018/05/GGTC-Beach-Photo-by-Lee-Cannon.jpg",
  "https://wallpapercave.com/wp/wp3635654.jpg",
  "https://wallpapercave.com/wp/wp3635654.jpg",
  "https://www.southernliving.com/thmb/opLh6q5S5cEOFPbXQ97h8A0UcyQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grayton-beach-car-beach-4089102_bronco_0855-copy-2000-b094709c1f6f4f4ea401bdadbefb0227.jpg",
  "https://wallpapercave.com/wp/wp3635654.jpg",
  "https://wallpapercave.com/wp/wp3635654.jpg",
  "https://us-east-1.linodeobjects.com/agirlsguidetocars/2018/05/GGTC-Beach-Photo-by-Lee-Cannon.jpg",
];

const HeaderSlider = styled(Slider)`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const SlideImage = styled.img`
  width: 400px;
  height: 250px;
  object-fit: cover; /* Aplica el recorte */
  object-position: center; /* Centra la imagen en el recorte */
`;

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1250,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    centerMode: true,
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

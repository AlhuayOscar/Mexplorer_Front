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
  #container {
    overflow: hidden;
    height: 300px;
  }
  .slick-list {
    width: 100vw;
    height: 300px;
  }
  @media screen and (max-width: 1390px) {
    height: 300px;
    #container {
      width: 800px;
      height: 300px;
    }
    .slick-list {
      width: 100vw;
      height: 400px;
    }
  }
  @media screen and (max-width: 1024px) {
    height: 350px;
    #container {
      width: 600px;
      height: 350px;
    }
    .slick-list {
      height: 350px;
    }
  }
  @media screen and (max-width: 600px) {
    height: 280px;
    #container {
      width: 280px;
      height: 280px;
    }
    .slick-list {
      height: 280px;
    }
  }
  @media screen and (max-width: 450px) {
    #container {
      width: 350px;
    }
  }
  @media screen and (max-width: 350px) {
    width: 280px;
    #container {
      width: 280px;
    }
  }
`;

const SlideImage = styled.img`
  height: 305px;
  object-fit: cover;
  object-position: center;
  transition: 0.4s ease 0.15s;

  @media screen and (min-width: 768px) {
    height: 380px;
  }
`;

const Carousel = ({ images }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const showCards = images.length;
  console.log(showCards);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

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

  const settings = {
    dots: false,
    speed: 550,
    slidesToShow: !windowWidth ? showCards : getNumberOfItemsToShow(),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
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

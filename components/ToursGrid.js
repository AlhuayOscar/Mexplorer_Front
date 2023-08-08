import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import TourBox from "@/components/TourBox";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Estilos globales para personalizar los botones redondos
const CarouselGlobalStyles = createGlobalStyle`
  .carousel .control-dots .dot {
    background-color: ${(props) => props.theme.color} !important;
  }
`;
const StyledCarousel = styled(Carousel)`
  .carousel .slide .legend {
    background: transparent;
  }

  .carousel .control-dots .dot {
    background-color: ${(props) => props.theme.dotColor} !important;
    box-shadow: none;
    width: 10px;
    height: 10px;
    transition: 0.4s ease;
  }

  .carousel .control-dots .dot.selected {
    background-color: ${(props) => props.theme.dotColor} !important;
    box-shadow: none;
    transform: scale(1.5);
    transition: 0.4s ease;
  }
`;

const StyledToursGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  gap: 40px;
  margin: 0;
  opacity: ${(props) => (props.isActive ? "1" : "0.3")};
  filter: ${(props) => (props.isActive ? "none" : "blur(4px)")};
  transition: 0.4s ease;
`;

const StyledTourBox = styled(TourBox)`
  
`;

export default function ToursGrid({ tours }) {
  const [activeSlide, setActiveSlide] = useState(0);
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

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const getNumberOfItemsToShow = () => {
    if (windowWidth >= 1000) {
      return 3;
    } else if (windowWidth >= 786) {
      return 2;
    } else {
      return 1;
    }
  };

  const renderTours = () => {
    const slides = [];

    const itemsToShow = getNumberOfItemsToShow();
    for (let i = 0; i < tours.length; i += itemsToShow) {
      const chunk = tours.slice(i, i + itemsToShow);
      slides.push(
        <StyledToursGrid key={i} isActive={i / itemsToShow === activeSlide}>
          {chunk.map((tour) => (
            <StyledTourBox key={tour._id} {...tour} />
          ))}
        </StyledToursGrid>
      );
    }

    return slides;
  };

  return (
    <>
      <CarouselGlobalStyles theme={{ color: "#EE2743" }} />
      <StyledCarousel
        infiniteLoop={true}
        showArrows={false}
        showThumbs={false}
        selectedItem={activeSlide}
        showStatus={false} // Quita los números de navegación
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={40}
        verticalSwipe={'standar'}
        onChange={handleSlideChange}
      >
        {renderTours()}
      </StyledCarousel>
    </>
  );
}

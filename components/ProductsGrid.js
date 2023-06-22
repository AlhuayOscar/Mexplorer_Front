import React, { useState } from "react";
import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const StyledCarousel = styled(Carousel)`
  .carousel .slide .legend {
    background: transparent;
  }
`;

const StyledProductsGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 20px;
  opacity: ${(props) => (props.isActive ? "1" : "0.3")};
  filter: ${(props) => (props.isActive ? "none" : "blur(4px)")};
`;

const StyledProductBox = styled(ProductBox)`
  flex: 1;
`;

export default function ProductsGrid({ products }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const renderProducts = () => {
    const slides = [];

    for (let i = 0; i < products.length; i += 3) {
      const chunk = products.slice(i, i + 3);

      slides.push(
        <StyledProductsGrid key={i} isActive={i / 3 === activeSlide}>
          {chunk.map((product) => (
            <StyledProductBox key={product._id} {...product} />
          ))}
        </StyledProductsGrid>
      );
    }

    return slides;
  };

  return (
    <StyledCarousel
      showThumbs={false}
      selectedItem={activeSlide}
      onChange={handleSlideChange}
    >
      {renderProducts()}
    </StyledCarousel>
  );
}

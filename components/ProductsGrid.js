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
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 20px;
  opacity: ${(props) => (props.isActive ? "1" : "0.3")};
`;

export default function ProductsGrid({ products }) {
  const renderProducts = () => {
    const slides = [];

    for (let i = 0; i < products.length; i += 3) {
      const chunk = products.slice(i, i + 3);

      slides.push(
        <StyledProductsGrid key={i} isActive={i === 0}>
          {chunk.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
        </StyledProductsGrid>
      );
    }

    return slides;
  };

  return <StyledCarousel showThumbs={false}>{renderProducts()}</StyledCarousel>;
}

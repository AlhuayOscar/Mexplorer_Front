import Center from "@/components/Center";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const videos = [
  { id: 1, url: "/videos/beach2.mp4" },
  { id: 2, url: "/videos/beach2.mp4" },
  { id: 3, url: "/videos/beach2.mp4" },
  { id: 4, url: "/videos/beach2.mp4" },
  { id: 5, url: "/videos/beach2.mp4" },
  { id: 6, url: "/videos/beach2.mp4" },
];

const Bg = styled.div`
  background-color: #222;
  color: #fff;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
// const ColumnsWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 40px;
//   img {
//     max-width: 100%;
//     max-height: 200px;
//     display: block;
//     margin: 0 auto;
//   }
//   div:nth-child(1) {
//     order: 2;
//   }
//   @media screen and (min-width: 768px) {
//     grid-template-columns: 1.1fr 0.9fr;
//     div:nth-child(1) {
//       order: 0;
//     }
//     img {
//       max-width: 100%;
//     }
//   }
// `;
const CarrouselWrapper = styled.h2`
  display: flex;
  gap: 10px;
  margin-top: 25px;
  justify-content: center;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false}>
        {videos.map((video) => (
          <div key={video.id}>
            <video autoPlay loop muted width="100%" height="100%">
              <source src={video.url} type="video/mp4" />
              Tu navegador no admite la reproducción de videos.
            </video>
          </div>
        ))}
      </Carousel>
    </Bg>
  );
}

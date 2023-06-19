import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { Carousel } from "react-responsive-carousel";
import Searchbar from "./Searchbar";
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
  position: relative;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 5%;
  left: 2.5%;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 22px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  margin-bottom: 22px;
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
      <Overlay>
        <Title>Vive experiencias únicas en paisajes únicos</Title>
        <Subtitle>
          ¡El mejor lugar para disfrutar tus vacaciones en todo Cancún!
        </Subtitle>
        <Searchbar />
      </Overlay>
    </Bg>
  );
}

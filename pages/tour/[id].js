import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import styled, { css } from "styled-components";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "@/components/CartContext";
import CheckIcon from "@mui/icons-material/DoneOutlineRounded";
import CancelIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import ArrowIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import ToursImageCarousel from "@/components/ToursImageCarousel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Reservation from "@/components/Reservation";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ToursReviews from "@/components/ToursReviews";
import Footer from "@/components/Footer";
import ToursGrid from "@/components/ToursGrid";
import NavTour from "@/components/NavTour";
import {
  CancelPresentationOutlined,
  Diversity1Sharp,
  Reviews,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import ReviewBox from "@/components/ReviewBox";
import TimeBox from "@/components/TimeBox";
// const AsyncImageCarousel = ({ images }) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const loadImage = async (src) => {
//       const image = new Image();
//       image.src = src;
//       await image.decode();
//       setLoaded(true);
//     };

//     const loadImages = async () => {
//       const imagePromises = images.map((src) => loadImage(src));
//       await Promise.all(imagePromises);
//       setLoaded(true);
//     };

//     loadImages();
//   }, [images]);

//   return loaded ? <ToursImageCarousel images={images} /> : <div></div>;
// };

const ColWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleTour = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  background-color: #fff;
  padding: 30px 20px;
  @media screen and (min-width: 768px) {
    /* justify-content: space-around; */
    padding: 20px 8rem;
    border-bottom: 2px solid #ccc;
  }
`;

const Title = styled.div`
  font-size: 2.3rem;
  /*  color: #fff; */
`;

const SubtitleStyle = css`
  margin: 0;
  ${(props) =>
    props.red &&
    css`
      color: #ee2743;
    `}
  ${(props) =>
    props.purple &&
    css`
      color: #ac2484;
    `}
 ${(props) =>
    props.yellow &&
    css`
      color: #eeb547;
    `}
  ${(props) =>
    props.green &&
    css`
      color: #84c441;
    `}
  ${(props) =>
    props.pink &&
    css`
      color: #e73a78;
    `}
  ${(props) =>
    props.margin &&
    css`
      margin: 20px 0;
      font-size: 1.3rem;
      text-align: center;
      @media screen and (min-width: 768px) {
        text-align: left;
      }
    `}
    @media screen and (min-width: 768px) {
    width: 12rem;
    font-size: 1.5rem;
    ${(props) =>
      props.title &&
      css`
        width: auto;
      `}
  }
`;

const Subtitle = styled.h3`
  ${SubtitleStyle}
`;

const Check = styled(CheckIcon)`
  color: #84c441;
  margin-right: 5px;
  font-size: medium;
`;

const Cancel = styled(CancelIcon)`
  color: #ee2743;
  padding: 0;
  margin-right: 5px;
`;

const MovilHeader = styled.div`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Desktop = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const TourInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  @media screen and (min-width: 768px) {
    width: 65%;
    margin-right: 3rem;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  font-size: 1.3rem;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 100hv;
  color: #fff;

  ${(props) =>
    props.green &&
    css`
      background-color: #84c441;
    `}
  ${(props) =>
    props.red &&
    css`
      background-color: #ee2743;
    `}
  ${(props) =>
    props.purple &&
    css`
      background-color: #ac2484;
    `}
 ${(props) =>
    props.yellow &&
    css`
      background-color: #eeb547;
    `}
    ${(props) =>
    props.blue &&
    css`
      background-color: #00abbd;
    `}
    ${(props) =>
    props.pink &&
    css`
      background-color: #e73a78;
    `}
`;

const InfoBox = styled.div`
  padding: 30px;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: start;
    padding: 50px 20px;
    border-bottom: 1px solid #47556966;
  }
`;

const Description = styled.div`
  line-height: 1.5;
  padding: 20px;
  text-align: justify;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const Points = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    h4 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 500;
    }
    ${(props) =>
      props.long &&
      css`
        width: 80%;
      `}
    ${(props) =>
      props.short &&
      css`
        width: 40%;
      `}
  }
`;

const Point = styled.div`
  display: flex;
  align-items: start;
  margin: 10px 0;
  line-height: 1.5;
  font-size: 0.9rem;
`;

const OverflowProtection = styled.div`
  overflow: hidden;
`;

const Recomendations = styled.div`
  /* background-color: #ee2743; */
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ToursLink = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  color: #84c441;
  div {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const ArrowI = styled(ArrowIcon)`
  color: #84c441;
  font-size: medium;
`;

const ReservationBtn = styled.button`
  width: 100%;
  background-color: #ee2743;
  font-size: 1.2rem;
  padding: 15px;
  color: #fff;
  margin-bottom: 10px;
  border: none;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const commonStyles = `
  color: #00abbd;
  text-decoration: none;
`;

// const getStyledComponent = (component) => styled(component)`
//   ${commonStyles}
// `;

// const StyledWhatsapp = getStyledComponent(WhatsAppIcon);
// const StyledTwitter = getStyledComponent(TwitterIcon);
// const StyledTelegram = getStyledComponent(TelegramIcon);

export default function TourPage({ promoTours }) {
  const randomTour = {
    _id: "random_id",
    name: "Tour Aleatorio",
    description: "Esta es una descripción aleatoria del tour.",
    duration: "2 horas",
    images: ["random_image_1", "random_image_2", "random_image_3"],
    includes: ["Transporte", "Guía turístico", "Entradas"],
    doesntIncludes: ["Comida", "Bebidas"],
    requirements: ["Protector solar", "Ropa cómoda", "Cámara"],
    notes: ["Llevar efectivo", "No olvidar sombrero"],
    review: 4.5,
  };

  // useEffect(() => {
  //   // Get the current URL only when the component mounts (client-side).
  //   setCurrentUrl(window.location.href);
  // }, []);

 const tour = randomTour;

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

// export async function getServerSideProps(context) {
//   await mongooseConnect();
//   const { id } = context.query;
//   const tour = await Tour.findById(id);
//   const promoTours = await Tour.find({ promo: true }, null, { limit: 3 });
//   return {
//     props: {
//       tour: JSON.parse(JSON.stringify(tour)),
//       promoTours: JSON.parse(JSON.stringify(promoTours)),
//     },
//   };
// }

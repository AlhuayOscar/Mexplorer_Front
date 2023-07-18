import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import styled, { css } from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import TourImages from "@/components/TourImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "@/components/CartContext";
import { Carousel } from "react-responsive-carousel";
import CheckIcon from "@mui/icons-material/DoneOutlineRounded";
import Link from "next/link";
import ArrowIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import ToursImageCarousel from "@/components/ToursImageCarousel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TimeIcon from "@mui/icons-material/AccessTime";
import Reservation from "@/components/Reservation";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ToursReviews from "@/components/ToursReviews";
import Footer from "@/components/Footer";
import ToursGrid from "@/components/ToursGrid";
import NavTour from "@/components/NavTour";
import { Reviews } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
const AsyncImageCarousel = ({ images }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async (src) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      setLoaded(true);
    };

    const loadImages = async () => {
      const imagePromises = images.map((src) => loadImage(src));
      await Promise.all(imagePromises);
      setLoaded(true);
    };

    loadImages();
  }, [images]);

  return loaded ? <ToursImageCarousel images={images} /> : <div></div>;
};

const ColWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleTour = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  padding: 40px 20px;
  @media screen and (min-width: 768px) {
    justify-content: space-around;
  }
`;

const Title = styled.div`
  font-size: 2.3rem;
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

const IconShow = styled.div``;

const InfoBox = styled.div`
  padding: 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: start;
    padding: 20px;
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
    width: 80%;
  }
`;

const Point = styled.div`
  margin: 10px;
  line-height: 1.5;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const OverflowProtection = styled.div`
  overflow: hidden;
`;

const Price = styled.span`
  font-size: 1.4rem;
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

const Review = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin: 8px 0;
  justify-items: end;
  align-self: start;
  /* @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  } */
`;

const ArrowI = styled(ArrowIcon)`
  color: #84c441;
  font-size: medium;
`;

const TimeT = styled.div`
  color: #888888;
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const TimeI = styled(TimeIcon)`
  color: #888888;
`;

const TimeBox = styled.div`
  display: flex;
  align-items: center;
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

export default function TourPage({ tour, promoTours }) {
  console.log(promoTours);
  const { addTour } = useContext(CartContext);
  const [showDescription, setShowDescription] = useState(true);
  const [showIncludes, setShowIncludes] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const includesRef = useRef(null);
  const requirementsRef = useRef(null);
  const notesRef = useRef(null);
  const reviewsRef = useRef(null);
  const recomendationsRef = useRef(null);
  const reservationsRef = useRef(null);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Get the current URL only when the component mounts (client-side).
    setCurrentUrl(window.location.href);
  }, []);

  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleShowIncludes = () => {
    setShowIncludes(!showIncludes);
  };

  const handleShowRequirements = () => {
    setShowRequirements(!showRequirements);
  };

  const handleShowNotes = () => {
    setShowNotes(!showNotes);
  };

  const scrollToreservations = () => {
    reservationsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <OverflowProtection>
        <ToursImageCarousel images={tour.images} />
      </OverflowProtection>
      <TitleTour>
        <div>
          <Title>{tour.name}</Title>
          <TimeBox>
            <TimeI /> <TimeT>{tour.duration} hrs</TimeT>
          </TimeBox>
        </div>
        <div>
          {/* Facebook Share Button */}
          {/* <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </a> */}
          {/* FUNCIONA EL DE FACEBOOK PERO CON UNA URL REAL */}
          {/* WhatsApp Share Button */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent("Echa un vistazo a este tour!")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent("Echa un vistazo a este tour!")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramIcon />
          </a>
        </div>
        <Review>
          ⭐⭐⭐⭐ <b>4</b>
        </Review>
      </TitleTour>
      <NavTour
        includesRef={includesRef}
        requirementsRef={requirementsRef}
        notesRef={notesRef}
        reviewsRef={reviewsRef}
        recomendationsRef={recomendationsRef}
      />
      <ReservationBtn onClick={scrollToreservations}>
        Reserva ahora!!!
      </ReservationBtn>
      <MovilHeader>
        <HeaderInfo pink>
          Descripción general
          <IconShow onClick={handleShowDescription}>
            {showDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconShow>
        </HeaderInfo>
        {showDescription && <Description>{tour.description}</Description>}
        <HeaderInfo yellow>
          Que incluye
          <IconShow onClick={handleShowIncludes}>
            {showIncludes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconShow>
        </HeaderInfo>
        {showIncludes && (
          <InfoBox>
            <Subtitle yellow>Este tour incluye:</Subtitle>
            <Points>
              {tour.includes?.map((include) => (
                <Point>
                  <Check />
                  {include}
                </Point>
              ))}
            </Points>
          </InfoBox>
        )}
        <HeaderInfo purple>
          Que llevar
          <IconShow onClick={handleShowRequirements}>
            {showRequirements ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconShow>
        </HeaderInfo>
        {showRequirements && (
          <InfoBox>
            <Subtitle purple>A este tour recomendamos llevar:</Subtitle>
            <Points>
              {tour.requirements?.map((requirement) => (
                <Point>
                  <Check />
                  {requirement}
                </Point>
              ))}
            </Points>
          </InfoBox>
        )}
        <HeaderInfo green>
          Notas
          <IconShow onClick={handleShowNotes}>
            {showNotes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconShow>
        </HeaderInfo>
        {showNotes && (
          <InfoBox>
            <Subtitle green>Notas y recomendaciones:</Subtitle>
            <Points>
              {tour.notes?.map((note) => (
                <Point>
                  <Check />
                  {note}
                </Point>
              ))}
            </Points>
          </InfoBox>
        )}
        <Center>
          <Reservation tour={tour} reservationsRef={reservationsRef} />
        </Center>
      </MovilHeader>
      <Desktop>
        <ColWrapper>
          <TourInfoBox>
            <Subtitle title>Descripción general</Subtitle>
            <ToursLink href={"/tours"}>
              <div>
                <ArrowI />
                Ver todos los tours en Cancun
              </div>
            </ToursLink>
            <Description>{tour.description}</Description>

            {tour.includes && (
              <InfoBox ref={includesRef}>
                <Subtitle yellow>Que incluye</Subtitle>
                <Points>
                  {tour.includes?.map((include) => (
                    <Point>
                      <Check />
                      {include}
                    </Point>
                  ))}
                </Points>
              </InfoBox>
            )}
            {tour.requirements && (
              <InfoBox ref={requirementsRef}>
                <Subtitle purple>Que Llevar</Subtitle>
                <Points>
                  {tour.requirements?.map((requirement) => (
                    <Point>
                      <Check />
                      {requirement}
                    </Point>
                  ))}
                </Points>
              </InfoBox>
            )}

            {tour.notes && (
              <InfoBox ref={notesRef}>
                <Subtitle green>Notas</Subtitle>
                <Points>
                  {tour.notes?.map((note) => (
                    <Point>
                      <Check />
                      {note}
                    </Point>
                  ))}
                </Points>
              </InfoBox>
            )}
            {/* <PriceRow>
              <div>
                <Price>${tour.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addTour(tour._id)}>
                  <CartIcon />
                  Añadir al carrito
                </Button>
              </div>
            </PriceRow> */}
          </TourInfoBox>
          <Reservation tour={tour} sticky={true} />
        </ColWrapper>
      </Desktop>
      <Center>
        <Subtitle red reviewsRef={reviewsRef}>
          Reseñas
        </Subtitle>
        <ToursReviews tour={tour} />
      </Center>
      <Recomendations>
        <Subtitle purple ref={recomendationsRef}>
          Recomendaciones
        </Subtitle>
        <ToursGrid tours={promoTours} />
      </Recomendations>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const tour = await Tour.findById(id);
  const promoTours = await Tour.find({ promo: true }, null, { limit: 3 });
  return {
    props: {
      tour: JSON.parse(JSON.stringify(tour)),
      promoTours: JSON.parse(JSON.stringify(promoTours)),
    },
  };
}

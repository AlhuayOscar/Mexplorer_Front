import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import styled, { css } from "styled-components";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "@/components/CartContext";
import CheckIcon from "@mui/icons-material/DoneOutlineRounded";
import CancelIcon from '@mui/icons-material/CloseRounded';
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
import { CancelPresentationOutlined, Diversity1Sharp, Reviews } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import ReviewBox from "@/components/ReviewBox";
import TimeBox from "@/components/TimeBox";
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
    h4{
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

const getStyledComponent = (component) => styled(component)`
  ${commonStyles}
`;

const StyledWhatsapp = getStyledComponent(WhatsAppIcon);
const StyledTwitter = getStyledComponent(TwitterIcon);
const StyledTelegram = getStyledComponent(TelegramIcon);

export default function TourPage({ tour, promoTours }) {
  console.log(tour)
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
          <TimeBox duration={tour.duration} /* white *//>
        </div>
        <div>
          <ReviewBox review={tour.review}/>
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
          <Link
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledWhatsapp />
          </Link>
          <Link
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent("Echa un vistazo a este tour!")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledTwitter />
          </Link>
          <Link
            href={`https://t.me/share/url?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent("Echa un vistazo a este tour!")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledTelegram />
          </Link>
        </div>
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
          <div onClick={handleShowDescription}>
            {showDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </HeaderInfo>
        {showDescription && <Description>{tour.description}</Description>}
        <HeaderInfo yellow>
          Que incluye
          <div onClick={handleShowIncludes}>
            {showIncludes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </HeaderInfo>
        {showIncludes && (
          <InfoBox>
            <Subtitle yellow>Este tour incluye:</Subtitle>
            <Points>
              {tour.includes?.map((include) => (
                <Point key={include}>
                  <Check />
                  {include}
                </Point>
              ))}
              <Subtitle yellow>Este tour no incluye:</Subtitle>
              {tour.doesntIncludes?.map((doesntInclude) => (
                <Point key={doesntInclude}>
                  <Cancel />
                  {doesntInclude}
                </Point>
              ))}
            </Points>
          </InfoBox>
        )}
        <HeaderInfo purple>
          Que llevar
          <div onClick={handleShowRequirements}>
            {showRequirements ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </HeaderInfo>
        {showRequirements && (
          <InfoBox>
            <Subtitle purple>A este tour recomendamos llevar:</Subtitle>
            <Points>
              {tour.requirements?.map((requirement) => (
                <Point key={requeriment}>
                  <Check />
                  {requirement}
                </Point>
              ))}
            </Points>
          </InfoBox>
        )}
        <HeaderInfo green>
          Notas
          <div onClick={handleShowNotes}>
            {showNotes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </HeaderInfo>
        {showNotes && (
          <InfoBox>
            <Subtitle green>Notas y recomendaciones:</Subtitle>
            <Points>
              {tour.notes?.map((note) => (
                <Point key={note}>
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
                <Points short>
                  <h4>Este tour incluye:</h4>
                  {tour.includes?.map((include) => (
                    <Point key={include}>
                      <Check />
                      {include}
                    </Point>
                  ))}
                </Points>
                {tour.doesntIncludes && (
                  <>
                    <Points short>
                      <h4>Este tour no incluye:</h4>
                      {tour.doesntIncludes?.map((doesntInclude) => (
                        <Point key={doesntInclude}>
                          <Cancel />
                          {doesntInclude}
                        </Point>
                      ))}
                    </Points>
                  </>
                )}
              </InfoBox>
            )}
            {tour.requirements && (
              <InfoBox ref={requirementsRef}>
                <Subtitle purple>Que Llevar</Subtitle>
                <Points long>
                  {tour.requirements?.map((requirement) => (
                    <Point key={requirement}>
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
                <Points long>
                  {tour.notes?.map((note) => (
                    <Point key={note}>
                      <Check />
                      {note}
                    </Point>
                  ))}
                </Points>
              </InfoBox>
            )}
            {/* <div>
                <button onClick={() => addTour(tour._id)}>
                  Añadir al carrito
                </button>
            </div> */}
          </TourInfoBox>
          <Reservation tour={tour} sticky={true} />
        </ColWrapper>
      </Desktop>
      <Center>
        <Subtitle red margin ref={reviewsRef}>Reseñas</Subtitle>
        <ToursReviews tour={tour}/>  
      </Center>
      <Recomendations>
          <Subtitle purple margin ref={recomendationsRef}>Recomendaciones</Subtitle>
        <ToursGrid tours={promoTours}/>
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

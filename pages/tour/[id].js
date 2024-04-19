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
import ToursReviews from "@/components/ToursReviews";
import Footer from "@/components/Footer";
import ToursGrid from "@/components/ToursGrid";
import NavTour from "@/components/NavTour";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import ReviewBox from "@/components/ReviewBox";
import TimeBox from "@/components/TimeBox";

import Links from "@/components/Links";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 435px;
  background-color: rgba(0, 0, 0, 0); /* Puedes ajustar la opacidad aquí */
  pointer-events: none; /* Evitamos que el overlay capture eventos del mouse */
  z-index: 1; /* Aseguramos que el overlay esté por encima del carousel */
  display: ${(props) =>
    props.show
      ? "block"
      : "none"}; /* Mostramos u ocultamos el overlay según el valor de "show" */
`;

export default function TourPage({ tour, promoTours }) {
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
  const [showOverlay, setShowOverlay] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setShowOverlay(window.innerWidth < 768);
    };

    handleResize(); // Verificamos el tamaño al cargar el componente

    window.addEventListener("resize", handleResize); // Agregamos el evento para cambios en el tamaño de la pantalla

    return () => {
      window.removeEventListener("resize", handleResize); // Eliminamos el evento al desmontar el componente
    };
  }, []);

  // Cambia el idioma con i18n
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {}, [currentLanguage]);

  // Se Obtiene los valores en español e inglés basados en el idioma actual
  const displayName = currentLanguage === "es" ? tour?.name : tour?.nameEng;
  const displayDescription =
    currentLanguage === "es" ? tour?.description : tour?.descriptionEng;
  const displayIncludes =
    currentLanguage === "es" ? tour?.includes : tour?.includesEng;
  const displayDoesntIncludes =
    currentLanguage === "es" ? tour?.doesntIncludes : tour?.doesntIncludesEng;
  const displayRequirements =
    currentLanguage === "es" ? tour?.requirements : tour?.requirementsEng;
  const displayNotes = currentLanguage === "es" ? tour?.notes : tour?.notesEng;
  const StaticImages = tour?.images;
  return (
    <>
      <Header />
      <Overlay show={showOverlay} />
      <OverflowProtection>
        <ToursImageCarousel images={StaticImages} />
      </OverflowProtection>
      <TitleTour>
        <div>
          <Title>{displayName}</Title>
          <TimeBox duration={tour?.duration} /* white */ />
        </div>
        <div>
          <ReviewBox review={tour?.review} />
          <Links currentUrl={currentUrl} />
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
        {t("Reserva ahora")}!!!
      </ReservationBtn>
      <MovilHeader>
        <HeaderInfo pink>
          {t("Descripción general")}
          <div onClick={handleShowDescription}>
            {showDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </HeaderInfo>
        {showDescription && (
          <Description>
            <ToursLink href={"/tours"}>
              <div>
                <ArrowI />
                {t("Ver todos los tours en Cancun")}
              </div>
            </ToursLink>
            {displayDescription}
          </Description>
        )}
        <HeaderInfo yellow>
          {t("Que incluye")}
          <div onClick={handleShowIncludes}>
            {showIncludes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </HeaderInfo>
        {showIncludes && (
          <InfoBox>
            <Subtitle yellow>{t("Este tour incluye")}:</Subtitle>
            <Points>
              {tour?.includes?.map((include) => (
                <Point key={include}>
                  <Check />
                  {displayIncludes}
                </Point>
              ))}
              <Subtitle yellow>{t("Este tour no incluye")}:</Subtitle>
              {tour?.doesntIncludes?.map((doesntInclude) => (
                <Point key={doesntInclude}>
                  <Cancel />
                  {displayDoesntIncludes}
                </Point>
              ))}
            </Points>
          </InfoBox>
        )}
        <HeaderInfo purple>
          {t("Que llevar")}
          <div onClick={handleShowRequirements}>
            {showRequirements ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </HeaderInfo>
        {showRequirements && (
          <InfoBox>
            <Subtitle purple>{t("A este tour recomendamos llevar")}:</Subtitle>
            <Points>
              {tour?.requirements?.map((requirement) => (
                <Point key={requirement}>
                  <Check />
                  {displayRequirements}
                </Point>
              ))}
            </Points>
          </InfoBox>
        )}
        <HeaderInfo green>
          {t("Notas")}
          <div onClick={handleShowNotes}>
            {showNotes ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
        </HeaderInfo>
        {showNotes && (
          <InfoBox>
            <Subtitle green>{t("Notas y recomendaciones")}:</Subtitle>
            <Points>
              {tour?.notes?.map((note) => (
                <Point key={note}>
                  <Check />
                  {displayNotes}
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
            <Subtitle title>{t("Descripción general")}</Subtitle>
            <ToursLink href={"/tours"}>
              <div>
                <ArrowI />
                {t("Ver todos los tours en Cancun")}
              </div>
            </ToursLink>
            <Description>{displayDescription}</Description>

            {tour?.includes && (
              <InfoBox ref={includesRef}>
                <Subtitle yellow>{t("Que incluye")}</Subtitle>
                <Points short>
                  <h4>{t("Este tour incluye")}:</h4>
                  {tour?.includes?.map((include) => (
                    <Point key={include}>
                      <Check />
                      {displayIncludes}
                    </Point>
                  ))}
                </Points>
                {tour?.doesntIncludes && (
                  <>
                    <Points short>
                      <h4>{t("Este tour no incluye")}:</h4>
                      {tour?.doesntIncludes?.map((doesntInclude) => (
                        <Point key={doesntInclude}>
                          <Cancel />
                          {displayDoesntIncludes}
                        </Point>
                      ))}
                    </Points>
                  </>
                )}
              </InfoBox>
            )}
            {tour?.requirements && (
              <InfoBox ref={requirementsRef}>
                <Subtitle purple>{t("Que llevar")}</Subtitle>
                <Points long>
                  {tour?.requirements?.map((requirement) => (
                    <Point key={requirement}>
                      <Check />
                      {displayRequirements}
                    </Point>
                  ))}
                </Points>
              </InfoBox>
            )}

            {tour?.notes && (
              <InfoBox ref={notesRef}>
                <Subtitle green>{t("Notas")}</Subtitle>
                <Points long>
                  {tour?.notes?.map((note) => (
                    <Point key={note}>
                      <Check />
                      {displayNotes}
                    </Point>
                  ))}
                </Points>
              </InfoBox>
            )}
            {/* <div>
                <button onClick={() => addTour(tour?._id)}>
                  Añadir al carrito
                </button>
            </div> */}
          </TourInfoBox>
          <Reservation tour={tour} sticky={true} />
        </ColWrapper>
      </Desktop>
      <Center>
        <Subtitle red margin ref={reviewsRef}>
          {t("Reseñas")}
        </Subtitle>
        <ToursReviews tour={tour} />
      </Center>
      <Recomendations>
        <Subtitle purple margin ref={recomendationsRef}>
          {t("Recomendaciones")}
        </Subtitle>
        <ToursGrid tours={promoTours} />
      </Recomendations>
      <Footer />
    </>
  );
}

/* export async function getServerSideProps(context) {
  const { id } = context.query;
  const tour = await axios.get(`http://localhost:3000/detail/${id}`);
  const promoTours = await axios.get(`http://localhost:3000/detail/promo`);

  return {
    props: {
      tour: tour?.data,
      promoTours: promoTours.data,
    },
  };
} */
const tourCache = new Map();

export async function getServerSideProps(context) {
  try {
    await mongooseConnect(); // Esperar a que se establezca la conexión con la base de datos

    const { id } = context.query;


    const tour = await Tour.findById(id);
    if (!tour) {
      console.log("No se encontró ningún tour con el ID proporcionado.");
    } else {
      tourCache.set(id, tour);
    }

    const promoTours = await Tour.find({ promo: true }, null, { limit: 3 });

    return {
      props: {
        tour: JSON.parse(JSON.stringify(tour)),
        promoTours: JSON.parse(JSON.stringify(promoTours)),
      },
    };
  } catch (error) {
    console.error("Error al obtener los datos del tour:", error);
    return {
      props: {
        tour: null,
        promoTours: null,
      },
    };
  }
}

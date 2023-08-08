import styled from "styled-components";
import Button from "@/components/Button";
import React, { useEffect } from 'react'
//import { CartContext } from './CartContext'
import Link from "next/link";
import Image from "next/image";
//import TimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/router';
import TimeBox from "./TimeBox";
import ReviewBox from "./ReviewBox";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const TourWrapper = styled.div`
/* Por ahora no hay nada acá */
  display: flex;
  flex-direction: column;
  height: 27.5rem;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  background-color: #fff;
  /* border: 2px solid #47556955; */
  box-shadow: 2px 2px 4px #47556955;
  text-decoration: none;
  color: #000;
  border-radius: 7px;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    height: 15rem;
    width: 100%;
    flex-direction: row;
    box-shadow: 2px 2px 4px #47556966;
  }
`;

const WhiteBox = styled(Link)`
  width: 100%;
  height: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (min-width: 768px) {
    width: 35%;
    height: 100%;
  }
`;

const Title = styled(Link)`
  font-weight: 300;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #84C441;
  text-decoration: none;
`;

const PromoTitle = styled.div`
  background-color: #ee2743;
  padding: 0.2rem 5rem;
  color: #1f2937;
  position: absolute;
  top: 2.2rem;
  right: -5.5rem;
  color: #fff;
  transform: rotate(40deg);
`;

const TourInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 50%;
  padding: 20px;
  @media screen and (min-width: 768px) {
    width: 65%;
  }
`;


const Prices = styled.div`
  align-self: flex-end;
  margin: 2px 0;
`;

const Price = styled.div`
  display: inline;
  font-size: 1.6rem;
  
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.8rem;
    
  }
`;

const Promo = styled.s`
  color: #ee2743;
  display: inline-block;
  margin-right: 10px;
  font-size: 1.4rem;
  
  @media screen and (min-width: 768px) {
    font-size: 1.6rem;
    
  }`;

const Description = styled.div`
  font-size: 0.8rem;
  text-align: left;
  height: 2rem;
  @media screen and (min-width: 768px) {
    font-size: 0.9rem;
    height: 2.5rem;
  }
`;
const ButtonG = styled(Button)`
  align-self: end;
  &:hover {
    scale: 1.1;
    background-color: #699c34;
  }
`;


function TourBoxH({ _id, name, nameEng, subtitleEng, subtitle, duration, promo, review, price, images }) {
  const url = `/tour/${_id}`
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(url);
  };

  // Cambia el idioma con i18n
  const { t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    console.log("currentLanguage", currentLanguage);
  }, [currentLanguage]);

  // Se Obtiene los valores en español e inglés basados en el idioma actual
  const displayName = currentLanguage === 'es' ? name : nameEng;
  const displaySubtitle = currentLanguage === 'es' ? subtitle : subtitleEng;
  const displayPrince = currentLanguage === 'es' ? price.mxn?.adultsPrice : price.usd?.adultsPrice;
  const displayPromo = currentLanguage === 'es' ? price.mxn?.withoutPromoAdultsPrice : price.usd?.withoutPromoAdultsPrice;

  return (
    <TourWrapper>
      <WhiteBox href={url}>
        <Image src={images?.[0]}
          alt={`imagen del tour ${name}`}
          width={350}
          height={310}
        />
        {promo && <PromoTitle>{t("Promo Exclusiva")}</PromoTitle>}
      </WhiteBox>
      <TourInfoBox>
        <Title href={url}>{displayName}</Title>
        <ReviewBox review={review} opinions={true} />
        <Description>{displaySubtitle}</Description>
        {/* <TypeT>Todo en uno</TypeT> */}
        <TimeBox duration={duration} />
        <Prices>
          {displayPromo && <Promo>${displayPromo}{t("Moneda")}</Promo>}
          <Price>${displayPrince}{t("Moneda")}</Price>
        </Prices>
        <ButtonG onClick={handleButtonClick} green>
          {t("Reserva ahora")}
        </ButtonG>
      </TourInfoBox>
    </TourWrapper>
  )
}

export default TourBoxH;
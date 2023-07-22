import styled from "styled-components";
import Button from "@/components/Button";
import React, { useContext } from 'react'
import { CartContext } from './CartContext'
import Link from "next/link";
import Image from "next/image";
import TimeIcon from '@mui/icons-material/AccessTime';
import { useRouter } from 'next/router';

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
  height: 50%;
  padding: 20px;
  @media screen and (min-width: 768px) {
    width: 65%;
    
  
  }
`;

const TimeT = styled.div`
  color: #888888;
  font-size: 1rem;
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

const Prices = styled.div`
  text-align: right;
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


function TourBoxH({ _id, name, subtitle, duration, adultsPrice, promo, withoutPromoPrice, images }) {
  const url = `/tour/${_id}`
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(url);
  };
  return (
    <TourWrapper>
      <WhiteBox href={url}>
      <Image src={images?.[0]} 
               alt={`imagen del tour ${name}`} 
               width={350}
               height={310}
                />
        {promo && <PromoTitle>¡Promo Exclusiva!</PromoTitle>}
      </WhiteBox>
      <TourInfoBox>
        <Title href={url}>{name}</Title>
        <Review>⭐⭐⭐⭐ <b>4</b></Review>
        <Description>{subtitle?.length <= 100 ? subtitle : subtitle?.substring(0, 100) + "..."}</Description>
        {/* <TypeT>Todo en uno</TypeT> */}
        <TimeBox><TimeI/> <TimeT>{duration} hrs</TimeT></TimeBox>
        <Prices>
          {withoutPromoPrice && <Promo>${withoutPromoPrice}</Promo>}
          <Price>${adultsPrice}USD</Price>
        </Prices>
        <ButtonG onClick={handleButtonClick} green>
          Reserva ahora!!
        </ButtonG>
      </TourInfoBox>
    </TourWrapper>
  )
}

export default TourBoxH;
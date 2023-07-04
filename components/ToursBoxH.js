import styled from "styled-components";
import Button from "@/components/Button";
import React, { useContext } from 'react'
import { CartContext } from './CartContext'
import Link from "next/link";

const TourWrapper = styled.div`
/* Por ahora no hay nada acá */
  display: flex;
  height: 15rem;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  background-color: #fff;
  /* border: 2px solid #47556955; */
  box-shadow: 2px 2px 4px #47556955;
  text-decoration: none;
  color: #000;
  @media screen and (min-width: 768px) {
    height: 15rem;
    width: 80%;
    box-shadow: 2px 2px 4px #47556966;
  }
`;

const WhiteBox = styled(Link)`
  width: 35%;
  height: 100%;
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
  }
`;

const Title = styled.div`
  font-weight: 300;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  color: #84C441;
`;

const PromoTitle = styled.div`
  background-color: #ee2743;
  padding: 0.2rem 5rem;
  color: #1f2937;
  text-decoration: none;
  position: absolute;
  top: 2.2rem;
  right: -5.5rem;
  color: #fff;
  transform: rotate(40deg);
`;

const TourInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 65%;
`;

const TimeT = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
    /* @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  } */
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
  height: 1.9rem;
  @media screen and (min-width: 768px) {
    font-size: 0.9rem;
    height: 2.5rem;
  }
`;
const ButtonG = styled(Button)`
  align-self: end;
`;


function TourBoxH({ _id, name, description, price, images }) {
  const {addTour} = useContext(CartContext);
  const url = `/Tour/${_id}`
  return (
    <TourWrapper>
      <WhiteBox href={url}>
        <img src={images?.[0]} alt="" />
        
        <PromoTitle>¡Promo Exclusiva!</PromoTitle>
      </WhiteBox>
      <TourInfoBox>
        <Title>{name}</Title>
        <Review>⭐⭐⭐⭐ <b>4</b></Review>
        <Description>{description.length <= 100 ? description : description.substring(0, 100) + "..."}</Description>
        {/* <TypeT>Todo en uno</TypeT> */}
        <TimeT>🕔 2 hrs</TimeT>
        
        

        <Prices>
          <Promo>$35</Promo>
          <Price>${price}USD</Price>
        </Prices>
        <ButtonG onClick={() => addTour(_id)} green>
          Reserva ahora!!
        </ButtonG>
      </TourInfoBox>
    </TourWrapper>
  )
}

export default TourBoxH;
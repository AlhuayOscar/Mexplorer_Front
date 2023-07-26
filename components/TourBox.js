import styled from "styled-components";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Image from "next/image";
import ReviewBox from "./ReviewBox";
import TimeBox from "./TimeBox";


const TourWrapper = styled(Link)`
/* Por ahora no hay nada acá */
  height: 22rem;
  width: 21rem;
  background-color: #fff;
  /* border: 2px solid #47556955; */
  box-shadow: 2px 2px 4px #47556955;
  text-decoration: none;
  color: #000;
  border-radius: 7px;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    height: 24rem;
    width: 23rem;
    box-shadow: 2px 2px 4px #47556966;
  }
`;

const WhiteBox = styled.div`
  width: 100%;
  height: 60%;
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
  padding: 0.5rem 1.2rem;
  background-color: #d4d4d4bb;
  left: 0;
  top: 2rem;
  font-weight: 300;
  font-size: 1rem;
  color: #1f2937;
  text-decoration: none;
  margin: 0;
  position: absolute;
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
  justify-content: start;
  align-items: flex-start;
  padding: 10px;
`;

const Prices = styled.div`
  align-self: flex-end;
  margin: 2px 0;
`;

const Price = styled.div`
  display: inline;
  font-size: 1.2rem;
  
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.4rem;
    
  }
`;

const Promo = styled.s`
  color: #ee2743;
  display: inline-block;
  margin-right: 10px;
  font-size: 1.2rem;
  
  @media screen and (min-width: 768px) {
    font-size: 1rem;
    
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
export default function TourBox({ _id, name, subtitle, review, duration, promo, price, images }) {
  const { addTour } = useContext(CartContext);
  const url = "/tour/" + _id;
  return (
    <TourWrapper href={url}>
      <WhiteBox>
        <Image src={images?.[0]} 
               alt={`imagen del tour ${name}`} 
               width={350}
               height={310}
                />
        <Title>{name}</Title>
        { promo && <PromoTitle>¡Promo Exclusiva!</PromoTitle> }
      </WhiteBox>
      <TourInfoBox>
        {/* <TypeT>Todo en uno</TypeT> */}
        <TimeBox duration={duration}/>
        <ReviewBox review={review} opinions={true}/>
        <Description>{subtitle.length <= 100 ? subtitle : subtitle.substring(0, 100) + "..."}</Description>
        <Prices>
          {price.usd.withoutPromoAdultsPrice && <Promo>${price.usd.withoutPromoAdultsPrice}</Promo>}
          <Price>${price.usd.adultsPrice}USD</Price>
        </Prices>
      </TourInfoBox>
    </TourWrapper>
  );
}
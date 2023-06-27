import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ProductWrapper = styled(Link)`
/* Por ahora no hay nada acá */
  height: 28rem;
  width: 23rem;
  border: 2px solid #47556955;
  box-shadow: 2px 2px 4px #47556955;
  text-decoration: none;
  color: #000;
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
const ContImg = styled.div`
  object-fit: cover;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
`;


const Title = styled.div`
  padding: 0.5rem 1.2rem;
  background-color: #d4d4d4;
  left: 0;
  top: 2rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: #475569;
  text-decoration: none;
  margin: 0;
  position: absolute;
`;

const Promo = styled.div`
  background-color: #dc2626;
  padding: 0.2rem 5rem;
  color: #1f2937;
  text-decoration: none;
  position: absolute;
  top: 2.2rem;
  right: -5.5rem;
  color: #fff;
  transform: rotate(40deg);
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 5px;
  padding: 10px;
`;

const TypeT = styled.div`
  font-size: 1rem;
  color: #6b7280;
  text-align: left;
  /* @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  } */
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
  margin-top: auto;
  justify-items: end;
  align-self: start;
  /* @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  } */
`;

const Price = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const Description = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
  /* @media screen and (min-width: 768px) {
    font-size: 0.6rem;
    font-weight: 600;
    text-align: left;
  } */
`;
export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  return (
    <ProductWrapper href={url}>
      <WhiteBox>
        <img src={images?.[0]} alt="" />
        <Title>{title}</Title>
        <Promo>¡Promo Exclusiva!</Promo>
      </WhiteBox>
      <ProductInfoBox>
        <TypeT>Todo en uno</TypeT>
        <TimeT>🕔 2 hrs</TimeT>
        <Description>{description}</Description>
        <Review>⭐⭐⭐⭐ <b>4</b> (30 opiniones)</Review>
        {/* <Price>${price}<Button block onClick={() => addProduct(_id)} primary outline>
          +
        </Button></Price> */}
      </ProductInfoBox>
    </ProductWrapper>
  );
}

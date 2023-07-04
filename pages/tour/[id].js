import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import TourImages from "@/components/TourImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { Carousel } from "react-responsive-carousel";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function TourPage({tour}) {
  const {addTour} = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <TourImages images={tour.images} />
          </WhiteBox>
          <div>
            <Title>{tour.title}</Title>
            <p>{tour.description}</p>
            <PriceRow>
              <div>
                <Price>${tour.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addTour(tour._id)}>
                  <CartIcon />Añadir al carrito
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const tour = await Tour.findById(id);
  return {
    props: {
      tour: JSON.parse(JSON.stringify(tour)),
    }
  }
}
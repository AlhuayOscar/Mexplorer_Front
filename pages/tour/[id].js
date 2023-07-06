import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Tour } from "@/models/Tour";
import styled, {css} from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import TourImages from "@/components/TourImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { Carousel } from "react-responsive-carousel";
import CheckIcon from '@mui/icons-material/DoneOutlineRounded';


const ColWrapper = styled.div`
 
`;

const SubtitleStyle = css`
 width: 12rem;
 margin: 0;
 ${props => props.red && css`
    color: #ee2743;
  `}
 ${props => props.purple && css`
    color: #ac2484;
  `}
 ${props => props.yellow && css`
    color: #eeb547;
  `}
`;

const Subtitle = styled.h3`
  ${SubtitleStyle}
`;

const Check = styled(CheckIcon)`
 color: #84C441;
 margin-right: 5px;
 font-size: medium;
`;

const TourInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 65%;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: start;
  padding: 20px;
  border-bottom: 1px solid #47556966;
`;

const Points = styled.div`
  display: flex;
  flex-direction: column;
`;

const Point = styled.div`
  margin: 10px;
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
            {/* <WhiteBox>
              <TourImages images={tour.images} />
            </WhiteBox> */}
            <TourInfoBox>
                <Title>{tour.name}</Title>
                
                  <h2>Descripción general</h2>
                  <p>{tour.description}</p>
                

                {tour.description && 
                  <InfoBox>
                    <Subtitle red>Que incluye</Subtitle>
                    <Points>
                      {tour.includes?.map(include => (
                        <Point><Check/>{include}</Point>
                      ))}
                    </Points>
                  </InfoBox>}

                {tour.requirements && 
                  <InfoBox>
                    <Subtitle purple>Que Llevar</Subtitle>
                    <Points>
                      {tour.requirements?.map(requirement => (
                        <Point><Check/>{requirement}</Point>
                      ))}
                    </Points>
                  </InfoBox>}

                  {tour.notes && 
                    <InfoBox>
                      <Subtitle yellow>Notas</Subtitle>
                      <Points>
                        {tour.notes?.map(note => (
                          <Point><Check/>{note}</Point>
                        ))}
                      </Points>
                    </InfoBox>}
               {/*  <PriceRow>
                  <div>
                    <Price>${tour.price}</Price>
                  </div>
                  <div>
                    <Button primary onClick={() => addTour(tour._id)}>
                      <CartIcon />Añadir al carrito
                    </Button>
                  </div>
                </PriceRow> */}
            </TourInfoBox>
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
import styled from "styled-components";
import Center from "@/components/Center";
import ToursGrid from "@/components/ToursGrid";

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 30px 0 20px;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const RedTitle = styled(Title)`
  color: #ee2743;
`;

const PurpleTitle = styled(Title)`
  color: #ac2484;
`;

const YellowTitle = styled(Title)`
  color: #eeb547;
`;

export default function NewTours({ tours, promo }) {
  return (
    <Center>
      <PurpleTitle>Encuentra tu lugar en cancún</PurpleTitle>
      <ToursGrid tours={tours} />
      <RedTitle>No te pierdas estas promos </RedTitle>
      <ToursGrid tours={promo} />
      <YellowTitle>Crea recuerdos inolvidables</YellowTitle>
      <ToursGrid tours={tours} />
    </Center>
  );
}

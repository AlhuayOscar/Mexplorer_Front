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

export default function NewTours({ tours }) {
  return (
    <Center>
      <RedTitle>Encuentra tu lugar en cancún</RedTitle>
      <ToursGrid tours={tours} />
      <PurpleTitle>Crea recuerdos inolvidables</PurpleTitle>
      <ToursGrid tours={tours} />
      <YellowTitle>Toma un merecido descanso</YellowTitle>
      <ToursGrid tours={tours} />
    </Center>
  );
}

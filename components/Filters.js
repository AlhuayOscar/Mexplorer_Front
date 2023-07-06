import styled from "styled-components";
import Center from "@/components/Center";
import ToursGrid from "@/components/ToursGrid";

const BoxContainer = styled.div`
  height: 30rem;
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #fff;
  box-shadow: 2px 2px 4px #47556955;
  border-radius: 7px;
  margin: 0;
  margin-bottom: 2rem;
  @media screen and (min-width: 768px) {
    width: 25%;
    
  }
`;

const TitleLabel = styled.label`
  background-color: #EEEEEE;
  border-radius: 3px;
  font-size: 1rem;
  padding: 8px ;
  margin: 2rem 0;
  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;


export default function Filters({ tours }) {
  return (
    <BoxContainer>
      <TitleLabel>Promociones</TitleLabel>
      <TitleLabel>Duracion</TitleLabel>
      <TitleLabel>Precios</TitleLabel>
    </BoxContainer>
  );
}

import styled from "styled-components";
import Center from "@/components/Center";
import ToursGrid from "@/components/ToursGrid";

const BoxNav = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  padding: 12px;
  background-color: #fff;
  box-shadow: 2px 2px 4px #47556955;
 /*  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  } */
`;




export default function NavTour({ tours }) {
  return (
    <BoxContainer>
      <TitleLabel>Promociones</TitleLabel>
      <TitleLabel>Duracion</TitleLabel>
      <TitleLabel>Precios</TitleLabel>
    </BoxContainer>
  );
}
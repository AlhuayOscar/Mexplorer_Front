import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

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

export default function NewProducts({ products }) {
  return (
    <Center>
      <RedTitle>Encuentra tu lugar en cancún</RedTitle>
      <ProductsGrid products={products} />
      <PurpleTitle>Crea recuerdos inolvidables</PurpleTitle>
      <ProductsGrid products={products} />
      <YellowTitle>Toma un merecido descanso</YellowTitle>
      <ProductsGrid products={products} />
    </Center>
  );
}

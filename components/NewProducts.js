import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({products}) {
  return (
    <Center>
      <Title>Encuentra tu lugar en cancún</Title>
      <ProductsGrid products={products} />
      <Title>Crea recuerdos inolvidables</Title>
      <ProductsGrid products={products} />
      <Title>Toma un merecido descanso</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
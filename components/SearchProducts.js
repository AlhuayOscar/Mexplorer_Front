import React from "react";
import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  justify-items: center;
  padding-bottom: 50px;
`;

const StyledProductBox = styled(ProductBox)`
  
`;

export default function SearchProducts({ products }) {
    return (
        <StyledProductsGrid>
            {products.map((product) => (
                <StyledProductBox key={product._id} {...product} />
            ))}
        </StyledProductsGrid>
    );
}

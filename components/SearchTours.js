import React from "react";
import styled from "styled-components";
import TourBox from "@/components/TourBox";

const StyledToursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  justify-items: center;
  padding-bottom: 50px;
`;

const StyledTourBox = styled(TourBox)`
  
`;

export default function SearchTours({ tours }) {
    return (
        <StyledToursGrid>
            {tours.map((tour) => (
                <StyledTourBox key={tour._id} {...tour} />
            ))}
        </StyledToursGrid>
    );
}

import styled from "styled-components";
import StarsRanting from "./StarsRating";

const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`;

const ReviewBox = ({ review, opinions }) => {
  return (
    <ReviewContainer>
      <StarsRanting size={'sm'} disabled={true} defaulHowMany={review?.total}/>
          <span>{review?.total} {opinions && `(${review?.quantity}) opiniones`}</span>
    </ReviewContainer>
  );
};

export default ReviewBox;
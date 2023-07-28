import styled, { css } from "styled-components";
import TimeIcon from '@mui/icons-material/AccessTime';

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  
`;

const TimeT = styled.div`
  color: #888888;
  font-size: 1rem;
  font-weight: 600;
  margin-left: 0.5rem;
  ${(props) =>
    props.white &&
    css`
      color: #fff;
    `}
`;

const TimeI = styled(TimeIcon)`
  color: #888888;
  ${(props) =>
    props.white &&
    css`
      color: #fff;
    `}
`;

const TimeBox = ({ duration, white }) => {
  return (
    <TimeContainer>
      <TimeI white={white ? 'white' : ''}/><TimeT white={white ? 'white' : ''}>{duration} hrs</TimeT>
    </TimeContainer>
  );
};

export default TimeBox;
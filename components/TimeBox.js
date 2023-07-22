import styled from "styled-components";
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
`;

const TimeI = styled(TimeIcon)`
  color: #888888;
`;

const TimeBox = ({ duration }) => {
  return (
    <TimeContainer>
      <TimeI/><TimeT>{duration} hrs</TimeT>
    </TimeContainer>
  );
};

export default TimeBox;
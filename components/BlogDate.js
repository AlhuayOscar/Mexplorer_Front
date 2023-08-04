import styled, {css} from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  ${props => props.padding && css`
    padding: 10px 20px;
    align-self: flex-end;
  `}
  
`;
const Calendar = styled(CalendarMonthIcon)`
  margin-right: 10px;
`;

const BlogDate = ({ date, padding }) => {
  return (
    <DateContainer padding={padding ? 'padding' : ''}>
      <Calendar />
    {dayjs(date).format("DD-MM-YYYY")}
    </DateContainer>
  );
};

export default BlogDate;
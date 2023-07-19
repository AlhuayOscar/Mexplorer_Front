import styled from "styled-components";

const StyledArea = styled.textarea`
  width: 100%;
  min-height: 6rem;
  max-height: 15rem;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;
  resize: vertical;
`;

export default function Textarea(props) {
    return <StyledArea {...props} />;
}
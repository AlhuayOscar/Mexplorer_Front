import styled from "styled-components";

const StyledArea = styled.textarea`
  width: 100%;
  /* min-height: 6rem;
  max-height: 15rem; */
  font-size: 1rem;
  height: 9.5rem;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;
  resize: none;
  &:hover {
    border: 1px solid #000;
    outline: none;
  }
  &:focus {
    border: 2px solid #84C441;
    outline: none;
  }
`;

export default function Textarea(props) {
    return <StyledArea {...props} />;
}
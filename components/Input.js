import styled, { css } from "styled-components";

const StyledInput = styled.input`
  width: 95%;
  padding: 10px;
  border-radius: 7px;
  margin: 10px;
  font-size: 0.9rem;
  border: 1px solid #0006;
  &:hover {
    border: 1px solid #000;
    outline: none;
  }
  &:focus {
    border: 2px solid #84C441;
    outline: none;
  }
  ${props => props.margin && css`
    margin: 5px 0px;
    width: 96%;
  `}`;

export default function Input(props) {
  return <StyledInput {...props} />
}
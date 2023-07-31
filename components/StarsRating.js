import styled from "styled-components";
import StarOutline from "./icons/StarOutline";
import StarSolid from "./icons/StarSolid";
import { useState, useRef } from "react";

// A simple counter to generate unique IDs
let counter = 0;

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  align-items: center;
`;

const StarWrapper = styled.button`
  ${(props) =>
    props.size === "md" &&
    `
    height: 1.4rem;
    width: 1.4rem;
  `}
  ${(props) =>
    props.size === "sm" &&
    `
    height: 1rem;
    width: 1rem;
  `}
  ${(props) => !props.disabled && `cursor: pointer;`}
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: #eeb527;
`;

export default function StarsRanting({
  size = "md",
  defaulHowMany = 1,
  disabled,
  onChange = () => {},
}) {
  const [howMany, setHowMany] = useState(defaulHowMany);
  const five = [1, 2, 3, 4, 5];

  // Use useRef to store and increment the counter
  const uniqueIdRef = useRef(`stars_${counter++}`);

  function handleStarClick(n) {
    if (disabled) {
      return;
    }
    setHowMany(n);
    onChange(n);
  }

  return (
    <StarsWrapper>
      {five.map((n) => (
        <StarWrapper
          key={`${uniqueIdRef.current}_${n}`} // Use the unique ID as the key
          disabled={disabled}
          size={size}
          onClick={() => handleStarClick(n)}
        >
          {howMany >= n ? <StarSolid /> : <StarOutline />}
        </StarWrapper>
      ))}
    </StarsWrapper>
  );
}

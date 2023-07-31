import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const moveRotateIn1 = keyframes`
  from {
    transform: translate(-50px, -150px) rotate(-90deg);
  }
  to {
    transform: translate(50px, 50px) rotate(90deg);
  }
`;

const moveRotateIn2 = keyframes`
  from {
    transform: translate(0, 0) rotate(0deg);
  }
  to {
    transform: translate(-150px, 150px) rotate(-180deg);
  }
`;

const moveRotateIn3 = keyframes`
  from {
    transform: translate(-50px, 100px) rotate(-180deg);
  }
  to {
    transform: translate(50px, -50px) rotate(-355deg);
  }
`;

const moveRotateIn4 = keyframes`
  from {
    transform: translate(150px, 150px) rotate(180deg);
  }
  to {
    transform: translate(-50px, -50px) rotate(270deg);
  }
`;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-80px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const changeColor = keyframes`
  0% {
    background-color: rgb(0, 0, 0);
  }
  100% {
    background-color: #1a1a1a;
  }
`;

const HojasImage = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;

  &:nth-of-type(1) {
    animation: ${moveRotateIn1} 4.6s forwards;
    top: -100px;
    left: -100px;
  }

  &:nth-of-type(2) {
    animation: ${moveRotateIn2} 4.6s forwards;
    top: -200px;
    right: -250px;
  }

  &:nth-of-type(3) {
    animation: ${moveRotateIn3} 4.6s forwards;
    bottom: -120px;
    left: -100px;
  }

  &:nth-of-type(4) {
    animation: ${moveRotateIn4} 4.6s forwards;
    bottom: -120px;
    right: -100px;
  }
`;

// Define a styled component for your SVG elements
const MexplorerLogoAnimation = () => {
  return (
    <>
        <HojasImage
          id="hojasImage1"
          src="/hojas.png"
          style={{ top: "-100px", left: "-100px" }}
        />
        <HojasImage
          id="hojasImage2"
          src="/hojas.png"
          style={{ top: "-200px", right: "-250px" }}
        />
        <HojasImage
          id="hojasImage3"
          src="/hojas.png"
          style={{ bottom: "-120px", left: "-100px" }}
        />
        <HojasImage
          id="hojasImage4"
          src="/hojas.png"
          style={{ bottom: "-120px", right: "-100px" }}
        />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="auto"
        viewBox="0 0 500 500"
        id="logoSVG"
      >

      </svg>
    </>
  );
};

export default MexplorerLogoAnimation;

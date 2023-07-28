import React from "react";
import styled from "styled-components";

const SearchbarContainer = styled.div`
  display: flex;
  align-items: center;
  transform: scale(${(props) => props.scale});
  transition: transform 0.3s ease-in-out;
`;

const Input = styled.input`
  flex: 1;
  border-radius: 5px 0 0 5px;
  padding: 12px 40px;
  border-width: 2px 0 2px 2px;
  border-style: solid;
  border-color: #ccc;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: #ee2743;
  color: white;
  border-radius: 0px 5px 5px 0px;
  padding: 14px 16px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Searchbar = () => {
  const [scale, setScale] = React.useState(1);

  const handleWindowResize = () => {
    const windowWidth = window.innerWidth;
    switch (true) {
      case windowWidth < 410:
        setScale(0.6);
        break;
      case windowWidth < 768:
        setScale(0.7);
        break;
      case windowWidth < 968:
        setScale(0.8);
        break;
      default:
        setScale(1);
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <SearchbarContainer scale={scale}>
      <Input type="text" placeholder="¿Qué lugar quisieras visitar?" />
      <SubmitButton type="submit">Buscar</SubmitButton>
    </SearchbarContainer>
  );
};

export default Searchbar;

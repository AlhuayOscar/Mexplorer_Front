import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const SearchbarContainer = styled.div`
  display: flex;
  align-items: center;
  transition: 0.4s ease;
  @media (max-width: 500px) {
    transform: scale(0.84);
  }
  @media (max-width: 270px) {
    transform: scale(0.54);
  }
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
const Searchbar = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState(props.value);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    setSearchInput(props.value);
  }, [props.value]);

  const handleSearch = () => {
    setRedirecting(true);
    router.push(`/search/${searchInput}`).then(() => {
      setRedirecting(false);
    });
  };
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <SearchbarContainer>
      <Input
        autoFocus
        value={searchInput}
        onChange={(ev) => setSearchInput(ev.target.value)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder={t("Busca tu próxima aventura")}
      />
      <SubmitButton onClick={handleSearch} disabled={redirecting}>
        {t("Buscar")}
      </SubmitButton>
    </SearchbarContainer>
  );
};

export default Searchbar;

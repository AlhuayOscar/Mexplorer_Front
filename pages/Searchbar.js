
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const SearchbarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  border-radius: 5px 0 0 5px;
  padding: 12px 40px;
  border-width: 2px 0 2px 2px; /* Grosor del borde en los lados superior, inferior e izquierdo */
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




  return (
    <SearchbarContainer>
      <Input
        autoFocus
        value={props.value}
        onChange={ev => props.setPhrase(ev.target.value)}
        type="text"
        placeholder="¿Qué lugar quisieras visitar?" />
      <Link href={{
        pathname: '/search/[[...name]]',
        query: { name: props.value },
      }} as={`/search?name=${props.value}`}>

        <SubmitButton
        >Buscar</SubmitButton>
      </Link>
    </SearchbarContainer>
  );
};

export default Searchbar;

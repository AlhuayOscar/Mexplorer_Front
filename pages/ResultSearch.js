// import ProductsGrid from "@/components/ProductsGrid";
// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";

// const SearchbarContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Input = styled.input`
//   flex: 1;
//   border-radius: 5px 0 0 5px;
//   padding: 12px 40px;
//   border-width: 2px 0 2px 2px; /* Grosor del borde en los lados superior, inferior e izquierdo */
//   border-style: solid;
//   border-color: #ccc;
//   outline: none;
// `;


// const SubmitButton = styled.button`
//   background-color: #ee2743;
//   color: white;
//   border-radius: 0px 5px 5px 0px;
//   padding: 14px 16px;
//   border: none;
//   outline: none;
//   cursor: pointer;
// `;

// const ResultSearch = () => {
//     const [phrase, setPhrase] = useState('');
//     useEffect(() => {
//         if (phrase.length > 0) {
//             axios.get('/api/products?phrase=' + encodeURIComponent(phrase))
//                 .then(response => {
//                     console.log(response.data);
//                 });
//         }
//     }, [phrase]);



//     return (
//         <SearchbarContainer>
//             <Input
//                 autoFocus
//                 value={phrase}
//                 onChange={ev => setPhrase(ev.target.value)}
//                 type="text"
//                 placeholder="¿Qué lugar quisieras visitar?" />
//             {products.length}
//             <ProductsGrid products={products} />
//         </SearchbarContainer>
//     );
// };

// export default ResultSearch;

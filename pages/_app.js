import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <I18nextProvider i18n={i18n}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </I18nextProvider>
    </>
  );
}

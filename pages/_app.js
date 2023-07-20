import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


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
          <LocalizationProvider dateAdapter={ AdapterDayjs }>
            <Component {...pageProps} />
          </LocalizationProvider>
        </CartContextProvider>
      </I18nextProvider>
    </>
  );
}

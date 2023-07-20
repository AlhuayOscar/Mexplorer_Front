
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n'; // Importa el archivo i18n.js que configuramos
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <GlobalStyles />
        <CartContextProvider>
          <LocalizationProvider dateAdapter={ AdapterDayjs }>
            <Component {...pageProps} />
          </LocalizationProvider>
        </CartContextProvider>
      </I18nextProvider>
    </>
  );
}

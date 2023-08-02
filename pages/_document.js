import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                #detach-button-host {
                  display: none !important;
                }
                body {
                  background-color: black; /* Fondo negro inicial */
                }
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                    background-color: transparent; /* Cambio a fondo transparente al final de la animación */
                  }
                }
                body {
                  opacity: 0;
                  animation: fadeIn 200ms ease-in 200ms forwards;
                }
              `,
            }}
          />
        </Head>
        <title>Mexplorer</title>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

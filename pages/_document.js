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
                  background-color: black;
                }
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                    background-color: rgb(238, 238, 238);
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

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
                  opacity: 0;
                  animation: fadeIn 100ms ease 100ms forwards;
                }
                @keyframes fadeIn {
                  to {
                    opacity: 1;
                  }
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

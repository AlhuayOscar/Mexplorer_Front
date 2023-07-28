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

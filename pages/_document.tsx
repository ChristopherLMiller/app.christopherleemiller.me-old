import Document, {
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

interface IDocument {
  styleTags: string;
}
export default class MyDocument extends Document<DocumentProps & IDocument> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet();
    try {
      const page = renderPage(App => props =>
        sheet.collectStyles(<App {...props} />)
      );
      const styleTags = sheet.getStyleElement();
      return { ...page, styleTags };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

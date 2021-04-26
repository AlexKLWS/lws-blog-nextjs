import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <script async defer data-domain='longwintershadows.com' src='https://plausible.io/js/plausible.js'></script>
        </Head>
        <body style={{ backgroundColor: '#000', marginTop: '0px' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*
          Search Console ownership. Public by design: the token proves that
          whoever controls this HTML controls the site, and it is in view-source
          either way, so there is nothing here to keep secret.

          It stays permanently. Removing it un-verifies the property — Google
          re-checks periodically rather than once — and it lives in the document
          rather than in SeoHead so no page can drop it by rendering its own head.
        */}
        <meta
          name="google-site-verification"
          content="Lj4JEAsXOZFMMgfZdykPadVwOjAFNAHljTPFuKdUrRQ"
        />
        {/*
          The same thing for Bing. Added manually rather than by importing the
          property from Search Console, which is the route Bing pushes: that
          import asks for OAuth access to the Google account, and a meta tag we
          control does the identical job without handing a second company a key
          to the first.
        */}
        <meta name="msvalidate.01" content="F42A99351BC16EDFF83EDA968BABAC53" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}



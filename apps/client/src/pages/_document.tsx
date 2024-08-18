import { DocumentProps, Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'

const MyDocument: React.FC<DocumentProps> = (props) => {
  return (
    <Html lang={props.locale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument

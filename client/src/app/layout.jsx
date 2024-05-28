import React from 'react'
import Providers from '../globalState/Providers'


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React</title>
      </head>
      <body>
      <div id="root">
        <Providers>
            {children}
        </Providers>
      </div>
      </body>
    </html>
  )
}

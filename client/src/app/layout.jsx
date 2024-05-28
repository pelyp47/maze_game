import React from 'react'
import Providers from '../globalState/Providers'
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';


export default function RootLayout({children}) {
  const locale = getLocale();
  const messages = getMessages()
  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React</title>
      </head>
      <body>
      <div id="root">
        <NextIntlClientProvider messages={messages}>
        <Providers>
            {children}
        </Providers>
        </NextIntlClientProvider>
      </div>
      </body>
    </html>
  )
}

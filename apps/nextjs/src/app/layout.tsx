import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import { IntlProvider } from '@farmers/language/intl-provider'
import { DEFAULT_LANGUAGE } from '@farmers/shared/app/constants'
import { cn } from '@farmers/ui'
import { Toaster } from '@farmers/ui/toast'

import { ModalSwitcher } from '~/app/_components/ModalSwitcher'
import { env } from '~/env'
import { TRPCReactProvider } from '~/trpc/react'

import '~/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === 'production'
      ? 'https://naturwirt.org/'
      : 'http://localhost:3000',
  ),
  title: 'Naturwirt',
  description: 'Organize subsidies for your farm',
  openGraph: {
    title: 'Naturwirt',
    description: 'Organize subsidies for your farm',
    url: 'https://naturwirt.org/',
    siteName: 'Naturwirt',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LANGUAGE} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-[600] text-foreground antialiased',
          inter.className,
        )}
      >
        <SessionProvider>
          <TRPCReactProvider>
            <IntlProvider>
              {props.children}
              <ModalSwitcher />
              <Toaster />
            </IntlProvider>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

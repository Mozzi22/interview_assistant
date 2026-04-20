import '../globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { ReactNode } from 'react'

import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import ChatBot from '@/components/ui/ChatBot'
import ThemeProvider from '@/components/ui/ThemeProvider'
import { routing } from '@/i18n/routing'
import { ReduxProvider } from '@/store/provider'

const inter = Inter({ subsets: ['latin'] })

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/logo.svg'
    }
  }
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

const RootLayout = async ({ children, params }: Props) => {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary transition-colors duration-300`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ReduxProvider>
              <Navigation />
              <main className="flex-grow pt-24 pb-12 md:px-12 lg:px-24">
                {children}
              </main>
              <ChatBot />
              <Footer />
            </ReduxProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout

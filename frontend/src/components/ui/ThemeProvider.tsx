'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof NextThemesProvider>

const ThemeProvider = ({ children, ...props }: Props) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
)

export default ThemeProvider

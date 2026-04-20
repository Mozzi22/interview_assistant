import { PAGES } from '@/utils/constants/pages-routes'

export const publicNavItems = [{ href: PAGES.HOME, labelKey: 'home' }] as const

export const protectedNavItems = [
  { href: PAGES.QUESTIONS, labelKey: 'questions' }
] as const

import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'

import {
  protectedNavItems,
  publicNavItems
} from '@/components/layout/Navigation/constants'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { Link, usePathname } from '@/i18n/routing'
import { setModal } from '@/store/features/uiSlice'
import { logout, selectIsAuthenticated } from '@/store/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const DesktopNavigation = () => {
  const pathname = usePathname()
  const t = useTranslations('Navigation')
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const navItems = isAuthenticated
    ? [...publicNavItems, ...protectedNavItems]
    : publicNavItems

  return (
    <nav className="hidden md:flex pointer-events-auto justify-end items-center space-x-4">
      {isAuthenticated && (
        <ul className="flex space-x-8 bg-sidebar/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-border">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-primary',
                    isActive ? 'text-primary' : 'text-text-muted'
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      <div className="flex items-center space-x-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
        {isAuthenticated ? (
          <button
            onClick={() => dispatch(logout())}
            className="flex items-center rounded-full px-4 py-2 bg-sidebar/80 backdrop-blur-md shadow-sm border border-border text-sm font-medium text-text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <span>{t('logout')}</span>
          </button>
        ) : (
          <>
            <button
              onClick={() => dispatch(setModal('login'))}
              className="flex items-center text-sm font-medium text-text-muted hover:text-primary transition-colors cursor-pointer"
            >
              <span>{t('login')}</span>
            </button>
            <button
              onClick={() => dispatch(setModal('register'))}
              className="flex items-center rounded-full px-4 py-2 bg-sidebar/80 backdrop-blur-md shadow-sm border border-border text-sm font-medium text-text-muted hover:text-primary transition-colors cursor-pointer"
            >
              <span>{t('registration')}</span>
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default DesktopNavigation

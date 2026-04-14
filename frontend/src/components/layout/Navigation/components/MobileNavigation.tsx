import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'

import type { AuthView } from '@/components/auth/AuthModal'
import { navItems } from '@/components/layout/Navigation/constants'
import { Link, usePathname } from '@/i18n/routing'
import { logout, selectIsAuthenticated } from '@/store/features/userSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

type Props = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setAuthModal: Dispatch<SetStateAction<AuthView | null>>
}

const MobileNavigation = ({ isOpen, setIsOpen, setAuthModal }: Props) => {
  const pathname = usePathname()
  const t = useTranslations('Navigation')
  const dispatch = useAppDispatch()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const handleCloseMenu = () => setIsOpen(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-40 md:hidden bg-sidebar/80 backdrop-blur-xl flex flex-col pt-24 px-8"
        >
          <ul className="flex flex-col space-y-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleCloseMenu}
                    className={clsx(
                      'text-3xl font-extrabold transition-colors',
                      isActive ? 'text-primary' : 'text-text-muted'
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              )
            })}

            <div className="mt-8 pt-8 border-t border-border flex flex-col space-y-6">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleCloseMenu()
                    dispatch(logout())
                  }}
                  className="text-3xl font-extrabold text-left transition-colors text-text-muted hover:text-primary"
                >
                  <span>{t('logout')}</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleCloseMenu()
                      setAuthModal('login')
                    }}
                    className="text-3xl font-extrabold text-left transition-colors text-text-muted hover:text-primary"
                  >
                    {t('login')}
                  </button>
                  <button
                    onClick={() => {
                      handleCloseMenu()
                      setAuthModal('register')
                    }}
                    className="text-3xl font-extrabold text-left transition-colors text-text-muted hover:text-primary"
                  >
                    {t('registration')}
                  </button>
                </>
              )}
            </div>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileNavigation

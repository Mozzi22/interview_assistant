'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import DesktopNavigation from '@/components/layout/Navigation/components/DesktopNavigation'
import MobileNavigation from '@/components/layout/Navigation/components/MobileNavigation'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { Link } from '@/i18n/routing'

import AuthModal, { type AuthView } from '../../auth/AuthModal'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [authModal, setAuthModal] = useState<AuthView | null>(null)

  const handleCloseMenu = () => setIsOpen(false)
  const handleToggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full p-4 md:p-6 z-50 flex items-center justify-between pointer-events-none">
        <Link
          href="/frontend/public"
          className="pointer-events-auto"
          onClick={handleCloseMenu}
        >
          <Image
            src="/logo.svg"
            alt="logo"
            width={48}
            height={48}
            className="hover:scale-105 transition-transform duration-300 drop-shadow-md w-10 h-10 md:w-12 md:h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNavigation setAuthModal={setAuthModal} />

        {/* Mobile Burger Button - Left aligned */}
        <div className="md:hidden flex items-center space-x-3 pointer-events-auto">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <button
            onClick={handleToggleMenu}
            className="pointer-events-auto p-2 bg-sidebar/80 backdrop-blur-md rounded-xl border border-border shadow-sm text-text-muted active:scale-95 transition-all"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <MobileNavigation
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setAuthModal={setAuthModal}
      />
      <AuthModal
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        initialView={authModal || 'login'}
        setAuthModal={setAuthModal}
      />
    </>
  )
}

export default Navigation

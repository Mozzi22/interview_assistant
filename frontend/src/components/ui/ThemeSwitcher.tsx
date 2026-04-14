'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const onMount = () => setMounted(true)
    onMount()
  }, [])

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full bg-sidebar/80 animate-pulse" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 bg-sidebar/80 backdrop-blur-md rounded-full shadow-sm border border-border text-text-muted hover:text-primary transition-colors cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export default ThemeSwitcher

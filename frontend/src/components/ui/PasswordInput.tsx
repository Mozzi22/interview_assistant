'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  registration: UseFormRegisterReturn
  placeholder?: string
  className?: string
}

const PasswordInput = ({
  registration,
  placeholder = '••••••••',
  className
}: Props) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <input
        {...registration}
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        className={`w-full px-4 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${className ?? ''}`}
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors cursor-pointer"
        tabIndex={-1}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  )
}

export default PasswordInput

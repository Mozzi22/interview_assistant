'use client'

import './globals.css'

import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative z-10 text-center px-6">
      <div className="mb-8 relative inline-block">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          className="text-[12rem] md:text-[18rem] font-black leading-none select-none bg-gradient-to-b from-primary/20 to-transparent bg-clip-text text-transparent"
        >
          404
        </motion.h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="glass p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full border border-border">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Lost in Code?
            </h2>
            <p className="text-foreground text-lg mb-8 leading-relaxed">
              The page you&apos;re looking for has been moved to a different
              repository or never existed in the first place.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 group"
            >
              <Home className="w-5 h-5" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default NotFound

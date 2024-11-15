'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent')
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="relative bg-[#1a1a1a] border border-zinc-800 p-6 rounded-lg shadow-2xl">
            {/* Decorative dots in corners */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full" />

            <div className="flex items-start space-x-4">
              <Cookie className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">🍪 Cookie Notice</h3>
                <p className="text-sm text-gray-300 mb-4">
                  We use cookies to enhance your chess experience, analyze site traffic, and provide personalized content. 
                  By clicking "Accept", you consent to our use of cookies.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={handleAccept}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={handleDecline}
                    className="flex-1 bg-white hover:bg-gray-100 text-black font-medium transition-colors"
                  >
                    Decline
                  </Button>
                </div>
              </div>
              <button
                onClick={handleDecline}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close cookie consent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
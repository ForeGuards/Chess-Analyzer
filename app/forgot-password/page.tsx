'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Sword as ChessIcon,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { auth } from '@/lib/firebase'
import { toast } from 'react-hot-toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!auth) {
      toast.error('Authentication not initialized')
      return
    }

    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)
    const loadingToast = toast.loading('Sending reset email...')

    try {
      await auth.sendPasswordResetEmail(email)
      toast.success('Password reset email sent! Please check your inbox.', {
        id: loadingToast,
      })
      setEmail('')
    } catch (error: any) {
      let errorMessage = 'Failed to send reset email. Please try again.'
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later.'
      }
      
      toast.error(errorMessage, {
        id: loadingToast,
      })
      
      console.error('Password reset error:', {
        code: error.code,
        message: error.message,
        domain: window.location.hostname
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[url('/images/signin-background.png')] bg-cover bg-center bg-no-repeat">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ChessIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">Chess Analyzer</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="min-h-[calc(100vh-3.5rem)] bg-black/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-zinc-950 rounded-lg p-8 shadow-2xl">
            <div className="mb-6">
              <Link 
                href="/signin" 
                className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Forgot your password?
            </h1>
            <p className="text-gray-400 mb-6">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <Button 
                type="submit"
                className="w-full bg-[#4338ca] hover:bg-[#4338ca]/90 transition-colors duration-300"
                disabled={isLoading}
              >
                Send Reset Instructions
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Sword as ChessIcon,
  ArrowLeft,
  Eye,
  EyeOff
} from "lucide-react"
import Link from "next/link"
import { auth } from '@/lib/firebase'
import { toast } from 'react-hot-toast'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [oobCode, setOobCode] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    // Get the oobCode (reset code) from the URL
    const code = searchParams.get('oobCode')
    if (code) {
      setOobCode(code)
    } else {
      toast.error('Invalid or expired reset link')
      router.push('/signin')
    }
  }, [searchParams, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!auth) {
      toast.error('Authentication not initialized')
      return
    }

    if (!oobCode) {
      toast.error('Invalid reset code')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    const loadingToast = toast.loading('Resetting password...')

    try {
      // Verify the password reset code and update password
      await auth.confirmPasswordReset(oobCode, newPassword)
      
      toast.success('Password reset successful! Please sign in with your new password.', {
        id: loadingToast,
        duration: 5000
      })
      
      // Redirect to sign in page after successful reset
      setTimeout(() => {
        router.push('/signin')
      }, 2000)
      
    } catch (error: any) {
      let errorMessage = 'Failed to reset password. Please try again.'
      
      if (error.code === 'auth/expired-action-code') {
        errorMessage = 'Reset link has expired. Please request a new one.'
      } else if (error.code === 'auth/invalid-action-code') {
        errorMessage = 'Invalid reset link. Please request a new one.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.'
      }
      
      toast.error(errorMessage, {
        id: loadingToast,
      })
      
      console.error('Password reset error:', {
        code: error.code,
        message: error.message
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
              Reset Your Password
            </h1>
            <p className="text-gray-400 mb-6">
              Please enter your new password below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500 pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              <div className="relative">
                <Input
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500 pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#4338ca] hover:bg-[#4338ca]/90 transition-colors duration-300"
                disabled={isLoading}
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 
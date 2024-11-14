'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { confirmPasswordReset } from 'firebase/auth'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Sword as ChessIcon,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  
  const oobCode = searchParams.get('oobCode')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!oobCode || !auth) {
      toast({
        title: "Error",
        description: "Invalid reset link or authentication not initialized",
        variant: "destructive",
      })
      router.push('/forgot-password')
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      await confirmPasswordReset(auth, oobCode, password)
      
      toast({
        title: "Success",
        description: "Password has been reset successfully!",
      })
      
      router.push('/signin')
    } catch (error) {
      console.error(error)
      const errorMessage = error instanceof Error ? error.message : "Failed to reset password. Please try again."
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
      if (error instanceof Error && 'code' in error && error.code === 'auth/invalid-action-code') {
        router.push('/forgot-password')
      }
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
              Reset Password
            </h1>
            <p className="text-gray-400 mb-6">
              Please enter your new password below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <Input
                className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <Button 
                type="submit"
                className="w-full bg-[#4338ca] hover:bg-[#4338ca]/90 transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
} 
'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { confirmPasswordReset } from 'firebase/auth'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-gray-500">Enter your new password below</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
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
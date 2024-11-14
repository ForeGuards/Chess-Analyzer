'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { applyActionCode, verifyPasswordResetCode } from 'firebase/auth'
import { useToast } from "@/components/ui/use-toast"

function AuthActionHandler() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    const handleAction = async () => {
      if (!oobCode || !mode || !auth) {
        setStatus('error')
        toast({
          title: "Error",
          description: "Invalid action link or authentication not initialized",
          variant: "destructive",
        })
        return
      }

      try {
        switch (mode) {
          case 'verifyEmail':
            await applyActionCode(auth, oobCode)
            toast({
              title: "Success",
              description: "Your email has been verified successfully!",
            })
            router.push('/signin')
            break

          case 'resetPassword':
            const email = await verifyPasswordResetCode(auth, oobCode)
            if (email) {
              router.push(`/reset-password?oobCode=${oobCode}`)
            } else {
              throw new Error('Invalid reset code')
            }
            break

          default:
            throw new Error('Invalid action mode')
        }
        setStatus('success')
      } catch (error) {
        console.error('Error handling auth action:', error)
        setStatus('error')
        const errorMessage = error instanceof Error ? error.message : "Failed to process your request. Please try again."
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
        router.push(mode === 'verifyEmail' ? '/signup' : '/forgot-password')
      }
    }

    handleAction()
  }, [mode, oobCode, router, toast])

  return (
    <div className="flex items-center justify-center min-h-screen">
      {status === 'loading' && (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      )}
      {status === 'error' && (
        <div className="text-red-500">
          An error occurred. Please try again.
        </div>
      )}
    </div>
  )
}

export default function AuthAction() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    }>
      <AuthActionHandler />
    </Suspense>
  )
} 
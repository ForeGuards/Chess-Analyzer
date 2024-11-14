'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { applyActionCode } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import type { Toast } from '@/lib/utils'

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const searchParams = useSearchParams()
  const router = useRouter()
  const oobCode = searchParams.get('oobCode')
  const { toast } = useToast()

  useEffect(() => {
    const verifyEmail = async () => {
      if (!oobCode) {
        setVerificationStatus('error')
        toast({
          title: "Error",
          description: "Invalid verification link",
          variant: "destructive",
        })
        return
      }

      try {
        if (!auth) {
          throw new Error('Auth not initialized')
        }
        await applyActionCode(auth, oobCode)
        setVerificationStatus('success')
        toast({
          title: "Success",
          description: "Your email has been verified successfully!",
        })
      } catch (error) {
        console.error('Error verifying email:', error)
        setVerificationStatus('error')
        toast({
          title: "Error",
          description: "Failed to verify email. Please try again.",
          variant: "destructive",
        })
      }
    }

    verifyEmail()
  }, [oobCode, toast])

  const handleContinue = () => {
    router.push('/signin')
  }

  return (
    <>
      <div className="container flex items-center justify-center min-h-screen py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              {verificationStatus === 'loading' && 'Verifying your email...'}
              {verificationStatus === 'success' && 'Your email has been verified successfully!'}
              {verificationStatus === 'error' && 'There was an error verifying your email.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {verificationStatus === 'success' && (
              <Button onClick={handleContinue} className="w-full">
                Continue to Sign In
              </Button>
            )}
            {verificationStatus === 'error' && (
              <Button onClick={() => router.push('/signup')} variant="secondary" className="w-full">
                Back to Sign Up
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  )
} 
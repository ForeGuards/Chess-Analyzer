'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import type { User as FirebaseUser } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { useToast } from "@/components/ui/use-toast"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (!auth) {
      console.error('Auth not initialized')
      router.push('/signin')
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/signin')
      } else if (!user.emailVerified && !user.providerData[0]?.providerId.includes('google')) {
        router.push('/signin')
        toast({
          title: "Email not verified",
          description: "Please verify your email before accessing this page.",
          variant: "destructive",
        })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router, toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <>{children}</>
}
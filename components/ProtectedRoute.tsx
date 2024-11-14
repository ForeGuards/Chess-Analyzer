'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import type { User as FirebaseUser } from 'firebase/auth'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<FirebaseUser | null>(null)

  useEffect(() => {
    if (!auth) {
      console.error('Auth not initialized')
      router.push('/signin')
      return
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser as FirebaseUser)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        router.replace('/signin')
      }
    }, (error: Error) => {
      console.error('Auth state error:', {
        error: error.message,
        errorName: error.name,
        domain: window.location.hostname
      })
      setLoading(false)
      router.replace('/signin')
    })

    return () => unsubscribe()
  }, [router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <>{children}</>
}
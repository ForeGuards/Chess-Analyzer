'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Github as GithubIcon, 
  Apple as AppleIcon,
  Crown as CrownIcon,
  Sword as ChessIcon 
} from "lucide-react"
import { GoogleIcon } from "@/components/icons/GoogleIcon"
import Link from "next/link"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { z } from 'zod'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import type { Toast } from '@/lib/utils'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      
      if (!auth) {
        throw new Error('Auth not initialized')
      }

      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        })
        return
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      
      // Send verification email with the new action URL
      await sendEmailVerification(userCredential.user, {
        url: `${window.location.origin}/auth/action?mode=verifyEmail`,
        handleCodeInApp: true,
      })

      toast({
        title: "Success",
        description: "Account created! Please check your email to verify your account.",
      })

      router.push('/signin')
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      if (!auth) {
        throw new Error('Auth not initialized')
      }
      const provider = new firebase.auth.GoogleAuthProvider()
      await auth.signInWithPopup(provider)
      await router.replace('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ ...errors, email: error.message })
      }
    }
  }

  const handleGithubSignIn = async () => {
    try {
      if (!auth) {
        throw new Error('Auth not initialized')
      }
      const provider = new firebase.auth.GithubAuthProvider()
      await auth.signInWithPopup(provider)
      await router.replace('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ ...errors, email: error.message })
      }
    }
  }

  const handleAppleSignIn = async () => {
    try {
      if (!auth) {
        throw new Error('Auth not initialized')
      }
      const provider = new firebase.auth.OAuthProvider('apple.com')
      await auth.signInWithPopup(provider)
      await router.replace('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ ...errors, email: error.message })
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-[url('/images/signup-background.png')] bg-cover bg-center bg-no-repeat">
      {/* Simplified Header */}
      <header className="bg-zinc-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ChessIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">Chess Analyzer</span>
          </Link>
        </div>
      </header>

      {/* Sign Up Form */}
      <div className="min-h-[calc(100vh-3.5rem)] bg-black/50 flex items-center justify-center p-4">
        <div className="grid md:grid-cols-2 w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out hover:shadow-blue-500/20">
          {/* Left Panel */}
          <div className="bg-gradient-to-br from-[#4338ca] to-[#3730a3] p-8 flex flex-col items-center justify-center text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-repeat bg-center" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
            </div>
            <CrownIcon className="w-16 h-16 mb-6 text-white/90" />
            <h1 className="text-4xl font-bold mb-2">Welcome Friend</h1>
            <p className="text-xl font-light mb-8 max-w-xs">
              To keep connected with us please login with your personal info.
            </p>
            <Button
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#4338ca] px-8 py-2 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/signin">SIGN IN</Link>
            </Button>
          </div>

          {/* Right Panel */}
          <div className="bg-zinc-950 p-8 md:px-6">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Create Account
              </h2>
              
              <div className="flex justify-center gap-6 mb-8">
                <Button
                  onClick={handleGoogleSignIn}
                  size="icon"
                  variant="outline"
                  className="rounded-full w-12 h-12 transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  <GoogleIcon className="w-6 h-6" />
                  <span className="sr-only">Sign up with Google</span>
                </Button>
                <Button
                  onClick={handleGithubSignIn}
                  size="icon"
                  variant="outline"
                  className="rounded-full w-12 h-12 transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  <GithubIcon className="w-6 h-6" />
                  <span className="sr-only">Sign up with GitHub</span>
                </Button>
                <Button
                  onClick={handleAppleSignIn}
                  size="icon"
                  variant="outline"
                  className="rounded-full w-12 h-12 transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  <AppleIcon className="w-6 h-6" />
                  <span className="sr-only">Sign up with Apple</span>
                </Button>
              </div>

              <p className="text-center text-sm text-gray-400 mb-6">
                or use your email for registration
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  required
                />
                <Input
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password}
                  required
                />
                <Input
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-invalid={!!errors.confirmPassword}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#4338ca] hover:bg-[#4338ca]/90 transition-colors duration-300"
                >
                  SIGN UP
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
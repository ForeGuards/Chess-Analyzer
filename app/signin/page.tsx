'use client'

import { useState, useEffect } from 'react'
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
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { auth } from '@/lib/firebase'

const testimonials = [
  {
    quote: "Chess Analyzer has transformed my game. The personalized insights and training plans have helped me improve my rating significantly!",
    author: "Alex Johnson",
    title: "Amateur Chess Enthusiast"
  },
  {
    quote: "As a coach, I recommend Chess Analyzer to all my students. It's like having an expert analyze every move you make.",
    author: "Sarah Thompson",
    title: "Chess Club Organizer"
  },
  {
    quote: "The depth of analysis provided by Chess Analyzer is incredible. It's become an essential tool in my tournament preparation.",
    author: "Michael Chen",
    title: "Regional Chess Champion"
  },
  {
    quote: "Chess Analyzer's intuitive interface and powerful features make it the perfect tool for players of all levels to improve their game.",
    author: "Emily Rodriguez",
    title: "Chess Tutor"
  },
  {
    quote: "The AI-powered analysis has given me insights I never would have considered. It's like having a grandmaster coach available 24/7.",
    author: "David Lee",
    title: "FIDE Master"
  },
  {
    quote: "Chess Analyzer's opening explorer has dramatically improved my game preparation. I feel much more confident in tournaments now.",
    author: "Sophie Grant",
    title: "National Chess Champion"
  },
  {
    quote: "As a beginner, I was intimidated by chess analysis. Chess Analyzer makes it accessible and fun to learn from my mistakes.",
    author: "Ryan Taylor",
    title: "Aspiring Chess Player"
  },
  {
    quote: "The progress tracking feature keeps me motivated. Seeing my rating climb is incredibly rewarding!",
    author: "Maria Sanchez",
    title: "Chess Club President"
  }
]

export default function SignIn() {
  const router = useRouter()
  const [testimonial, setTestimonial] = useState(testimonials[0])
  const [isProcessingRedirect, setIsProcessingRedirect] = useState(true)

  useEffect(() => {
    setTestimonial(testimonials[Math.floor(Math.random() * testimonials.length)])
  }, [])

  useEffect(() => {
    if (!auth) {
      setIsProcessingRedirect(false)
      return
    }

    const currentUser = auth.currentUser
    if (currentUser) {
      router.replace('/dashboard')
      return
    }

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await router.replace('/dashboard')
      } else {
        setIsProcessingRedirect(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSignIn = async (email: string, password: string) => {
    if (!auth) {
      console.error('Auth not initialized')
      return
    }
    
    try {
      setIsProcessingRedirect(true)
      
      // Add loading state feedback
      const loadingToast = toast.loading('Signing in...')
      
      const userCredential = await auth.signInWithEmailAndPassword(email, password)
      
      if (userCredential.user) {
        toast.success('Successfully signed in!', {
          id: loadingToast,
        })
        await router.replace('/dashboard')
      }
    } catch (error: any) {
      setIsProcessingRedirect(false)
      
      // Improved error handling with user feedback
      let errorMessage = 'Failed to sign in. Please try again.'
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password. Please try again.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.'
      }
      
      toast.error(errorMessage)
      console.error('Sign-in error:', {
        code: error.code,
        message: error.message,
        domain: window.location.hostname
      })
    }
  }

  const handleGoogleSignIn = async () => {
    if (!auth) return
    
    try {
      setIsProcessingRedirect(true)
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      
      const result = await auth.signInWithPopup(provider)
      if (result.user) {
        await router.replace('/dashboard')
      }
    } catch (error) {
      setIsProcessingRedirect(false)
    }
  }

  const handleGithubSignIn = async () => {
    if (!auth) {
      console.error('Auth not initialized')
      return
    }
    try {
      setIsProcessingRedirect(true)
      const provider = new firebase.auth.GithubAuthProvider()
      const result = await auth.signInWithPopup(provider)
      if (result.user) {
        await router.replace('/dashboard')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('GitHub sign-in error:', {
          code: (error as { code?: string }).code,
          message: error.message,
          domain: window.location.hostname
        })
      }
      setIsProcessingRedirect(false)
    }
  }

  const handleAppleSignIn = async () => {
    if (!auth) {
      console.error('Auth not initialized')
      return
    }
    try {
      setIsProcessingRedirect(true)
      const provider = new firebase.auth.OAuthProvider('apple.com')
      const result = await auth.signInWithPopup(provider)
      if (result.user) {
        await router.replace('/dashboard')
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Apple sign-in error:', {
          code: (error as { code?: string }).code,
          message: error.message,
          domain: window.location.hostname
        })
      }
      setIsProcessingRedirect(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const form = e.currentTarget
    const emailInput = form.elements.namedItem('email') as HTMLInputElement
    const passwordInput = form.elements.namedItem('password') as HTMLInputElement
    
    if (!emailInput?.value || !passwordInput?.value) {
      toast.error('Please fill in all fields')
      return
    }
    
    await handleSignIn(emailInput.value, passwordInput.value)
  }

  if (isProcessingRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[url('/images/signin-background.png')] bg-cover bg-center bg-no-repeat">
      {/* Simplified Header */}
      <header className="bg-zinc-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl py-4 px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ChessIcon className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">Chess Analyzer</span>
          </Link>
        </div>
      </header>

      {/* Sign In Form */}
      <div className="min-h-[calc(100vh-3.5rem)] bg-black/50 flex items-center justify-center p-4">
        <div className="grid md:grid-cols-2 w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out hover:shadow-blue-500/20">
          {/* Left Panel */}
          <div className="bg-gradient-to-br from-[#4338ca] to-[#3730a3] p-8 flex flex-col items-center justify-center text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-repeat bg-center" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
            </div>
            <CrownIcon className="w-16 h-16 mb-6 text-white/90" />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold mb-4">Sign In</h1>
              <p className="mb-8">
                Don&apos;t have an account? <Link href="/sign-up" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
              </p>
            </div>
            <Button
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#4338ca] px-8 py-2 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/signup">SIGN UP</Link>
            </Button>
          </div>

          {/* Right Panel */}
          <div className="bg-zinc-950 p-8 md:px-6">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-white text-center mb-6">
                Sign In to Your Account
              </h2>

              <div className="flex justify-center gap-6 mb-8">
                <Button
                  onClick={handleGoogleSignIn}
                  size="icon"
                  variant="outline"
                  className="rounded-full w-14 h-14 transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  <GoogleIcon className="w-10 h-10" />
                  <span className="sr-only">Sign in with Google</span>
                </Button>
                <Button
                  onClick={handleGithubSignIn}
                  size="icon"
                  variant="outline"
                  className="rounded-full w-14 h-14 transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  <GithubIcon className="w-10 h-10" />
                  <span className="sr-only">Sign in with GitHub</span>
                </Button>
                <Button
                  onClick={handleAppleSignIn}
                  size="icon"
                  variant="outline"
                  className="rounded-full w-14 h-14 transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  <AppleIcon className="w-10 h-10" />
                  <span className="sr-only">Sign in with Apple</span>
                </Button>
              </div>

              <p className="text-center text-sm text-gray-400 mb-6">
                or use your email to sign in
              </p>

              <form
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                <Input
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  id="email"
                  required
                />
                <Input
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full bg-[#4338ca] hover:bg-[#4338ca]/90 transition-colors duration-300"
                >
                  SIGN IN
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot your password?
                </Link>
              </div>

              <div className="mt-8 p-6 bg-zinc-900 rounded-lg">
                <blockquote className="text-white italic mb-4">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <p className="text-blue-400 font-semibold">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
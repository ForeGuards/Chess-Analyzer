import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

let auth: firebase.auth.Auth | null = null

// Initialize Firebase only once and handle SSR
if (typeof window !== 'undefined') {
  if (!firebase.apps.length) {
    try {
      const app = firebase.initializeApp(firebaseConfig)
      auth = app.auth()
      
      // Configure auth persistence and settings
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      
      // Set custom auth settings
      auth.settings.appVerificationDisabledForTesting = false
      
      // Add auth state listener with improved error handling
      auth.onAuthStateChanged((user) => {
        if (user) {
          // Only log when user exists to reduce noise
          console.log('Auth state changed:', {
            isAuthenticated: true,
            email: user.email,
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            domain: window.location.hostname
          })
        }
      }, (error) => {
        console.error('Auth state error:', {
          message: error.message,
          code: error.code,
          domain: window.location.hostname
        })
      })
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Firebase initialization error:', {
          message: error.message,
          stack: error.stack || 'No stack trace',
          env: process.env.NODE_ENV
        })
      }
    }
  } else {
    auth = firebase.auth()
  }
}

// Modified sign-in utility to handle COOP
export const signInWithProvider = async (provider: firebase.auth.AuthProvider) => {
  if (!auth) throw new Error('Auth not initialized')
  
  try {
    // Use signInWithRedirect instead of popup for better cross-origin support
    await auth.signInWithRedirect(provider)
    return null // Return will happen after redirect
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Sign-in error:', {
        code: (error as { code?: string }).code,
        message: error.message,
        domain: window.location.hostname
      })
    }
    throw error
  }
}

export { auth }
export default firebase 
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

let auth: firebase.auth.Auth | null = null

if (typeof window !== 'undefined') {
  const currentDomain = window.location.hostname
  const isVercelDomain = currentDomain.endsWith('vercel.app')
  const isLocalhost = currentDomain === 'localhost'
  
  if (isVercelDomain || isLocalhost) {
    if (!firebase.apps.length) {
      try {
        if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('undefined')) {
          throw new Error('Invalid configuration')
        }

        const app = firebase.initializeApp(firebaseConfig)
        auth = app.auth()
        
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .catch(() => {/* Handle silently */})

        auth.settings.appVerificationDisabledForTesting = false
        
      } catch (error: unknown) {
        // Silent error handling in production
        if (process.env.NODE_ENV === 'development' && error instanceof Error) {
          console.error('Initialization error')
        }
      }
    } else {
      auth = firebase.auth()
    }
  }
}

export { auth }
export default firebase 
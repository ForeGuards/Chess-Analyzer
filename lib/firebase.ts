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
      
      // Configure auth persistence
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      
      // Set auth settings
      auth.settings.appVerificationDisabledForTesting = process.env.NODE_ENV === 'development'
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Firebase initialization error:', error.message)
      }
    }
  } else {
    auth = firebase.auth()
  }
}

export { auth }
export default firebase 
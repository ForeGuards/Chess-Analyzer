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

if (typeof window !== 'undefined') {
  // Check if current domain is authorized
  const currentDomain = window.location.hostname
  const isVercelDomain = currentDomain.endsWith('vercel.app')
  const isLocalhost = currentDomain === 'localhost'
  
  if (isVercelDomain || isLocalhost) {
    if (!firebase.apps.length) {
      try {
        const app = firebase.initializeApp(firebaseConfig)
        auth = app.auth()
        
        // Configure auth persistence
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .catch((error) => {
            console.error('Auth persistence error:', error.message)
          })

        // Configure auth settings
        auth.settings.appVerificationDisabledForTesting = false
        
        // Add auth state observer
        auth.onAuthStateChanged((user) => {
          if (user) {
            // User is signed in
            localStorage.setItem('authUser', JSON.stringify({
              uid: user.uid,
              email: user.email
            }))
          } else {
            // User is signed out
            localStorage.removeItem('authUser')
          }
        })

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Firebase initialization error:', error.message)
        }
      }
    } else {
      auth = firebase.auth()
    }
  } else {
    console.error('Unauthorized domain:', currentDomain)
  }
}

export { auth }
export default firebase 
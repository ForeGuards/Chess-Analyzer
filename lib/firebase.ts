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
  // Check if current domain is authorized
  const currentDomain = window.location.hostname
  const isVercelDomain = currentDomain.endsWith('vercel.app')
  const isLocalhost = currentDomain === 'localhost'
  
  if (isVercelDomain || isLocalhost) {
    if (!firebase.apps.length) {
      try {
        // Debug log for config
        console.log('Firebase config:', {
          apiKey: firebaseConfig.apiKey?.slice(0, 5) + '...',
          authDomain: firebaseConfig.authDomain,
          projectId: firebaseConfig.projectId,
          currentDomain
        })

        // Validate API key before initialization
        if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('undefined')) {
          throw new Error('Invalid Firebase API key')
        }

        const app = firebase.initializeApp(firebaseConfig)
        auth = app.auth()
        
        // Configure auth persistence
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .catch((error) => {
            console.error('Auth persistence error:', error.message)
          })

        // Configure auth settings
        auth.settings.appVerificationDisabledForTesting = false
        
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Firebase initialization error:', {
            message: error.message,
            config: {
              apiKeyPresent: !!firebaseConfig.apiKey,
              authDomainPresent: !!firebaseConfig.authDomain,
              projectIdPresent: !!firebaseConfig.projectId
            },
            domain: currentDomain
          })
        }
      }
    } else {
      auth = firebase.auth()
    }
  }
}

export { auth }
export default firebase 
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  
  response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  )

  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.firebaseio.com https://*.gstatic.com https://*.google.com https://vercel.live https://apis.google.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live;
      style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live https://assets.vercel.com;
      img-src 'self' data: blob: https: https://vercel.live https://vercel.com https://lh3.googleusercontent.com;
      font-src 'self' https://fonts.gstatic.com https://vercel.live https://assets.vercel.com;
      frame-src 'self' https://*.firebaseapp.com https://*.firebase.com https://*.google.com https://vercel.live https://accounts.google.com;
      connect-src 'self' 
        https://*.firebase.com 
        https://*.firebaseio.com 
        https://identitytoolkit.googleapis.com 
        https://*.googleapis.com 
        https://securetoken.googleapis.com 
        https://vercel.live 
        wss://*.vercel.live 
        https://*.vercel.app
        https://*.pusher.com 
        wss://*.pusher.com 
        https://sockjs.pusher.com;
      worker-src 'self' blob:;
      frame-ancestors 'self' https://vercel.live;
    `.replace(/\s+/g, ' ').trim()
  )

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ]
} 
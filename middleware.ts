import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Updated Permissions-Policy
  response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=(), browsing-topics=(), private-state-token-redemption=(), private-state-token-issuance=()'
  )

  // Updated CSP header with all necessary domains
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.firebaseio.com https://*.gstatic.com https://*.google.com https://vercel.live https://*.vercel.app;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https: blob:;
      font-src 'self' https://fonts.gstatic.com;
      frame-src 'self' https://*.firebaseapp.com https://*.firebase.com https://*.google.com https://vercel.live;
      connect-src 'self' https://*.firebase.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://*.googleapis.com https://vercel.live wss://*.vercel.live https://*.vercel.app;
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
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  response.headers.delete('Cross-Origin-Embedder-Policy')
  response.headers.delete('Cross-Origin-Resource-Policy')
  response.headers.delete('Cross-Origin-Opener-Policy')

  response.headers.set(
    'Cross-Origin-Opener-Policy',
    'same-origin-allow-popups'
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
      frame-src 'self' https://*.firebaseapp.com https://*.firebase.com https://*.google.com https://vercel.live https://accounts.google.com https://chess-analyzer-cbda1.firebaseapp.com;
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
        https://sockjs.pusher.com
        https://*.supabase.co
        https://*.supabase.in
        https://khzavnbongoanukvqhli.supabase.co;
      worker-src 'self' blob:;
      form-action 'self';
      base-uri 'self';
      frame-ancestors 'none';
    `.replace(/\s+/g, ' ').trim()
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
} 
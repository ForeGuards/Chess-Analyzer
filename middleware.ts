import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the origin from the request headers
  const origin = request.headers.get('origin') || ''
  
  // Define allowed origins
  const allowedOrigins = [
    'https://chess-analyzer-two.vercel.app',
    'https://www.chess-analyzer-two.vercel.app',
    'http://localhost:3000'
  ]

  // Check if the origin is allowed
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Create the response
  const response = NextResponse.next()

  // Set CORS headers if origin is allowed
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  } else {
    response.headers.set('Access-Control-Allow-Origin', allowedOrigins[0])
  }

  // Set other CORS headers
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return response
}

// Configure which paths should be handled by the middleware
export const config = {
  matcher: [
    '/api/:path*',
    '/signin',
    '/signup',
    '/dashboard/:path*'
  ]
} 
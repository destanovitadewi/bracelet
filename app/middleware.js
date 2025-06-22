// /middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get pathname
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/kasir', '/produk', '/laporan', '/pengaturan']
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    // In a real application, you would check for a JWT token or session
    // For now, we'll just check if there's a session indicator
    // Note: This is basic protection, real auth should use JWT tokens
    
    // Since we can't access sessionStorage in middleware, 
    // you might want to use cookies for server-side auth checking
    // For now, we'll let the client-side AuthContext handle the auth state
  }

  return NextResponse.next()
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
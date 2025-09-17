/**
 * Middleware de autenticación
 * 
 * - Protege rutas que requieren autenticación
 * - Redirige usuarios no autenticados al login
 * - Evita que usuarios logueados accedan al login

 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  
  // Rutas que requieren autenticación
  const protectedPaths = ['/users', '/posts', '/books'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Si intenta acceder a ruta protegida sin token, redirigir al login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si ya está logueado y va al login, redirigir a users
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/users', request.url));
  }

  return NextResponse.next();
}

// se aplica a todas las rutas excepto a las que están en el array
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
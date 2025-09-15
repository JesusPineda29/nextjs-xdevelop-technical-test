import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  
  // Definir rutas protegidas
  const protectedPaths = ['/users', '/posts', '/books'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Redirigir a login si se intenta acceder a una ruta protegida sin token
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirigir a users page si ya está logueado y se intenta acceder a login
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/users', request.url));
  }

  return NextResponse.next();
}

// se aplica a todas las rutas excepto a las que están en el array
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
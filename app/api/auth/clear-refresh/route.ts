import { NextResponse } from 'next/server';

// Endpoint para limpiar el refresh token
export async function POST() {
  // Crear una respuesta exitosa
  const response = NextResponse.json({ success: true });
  
  // Limpiar el refresh token
  response.cookies.set('refreshToken', '', {
    // tiempo de expiración de 0 segundos
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  return response;
}

import { NextResponse } from 'next/server';

// Endpoint Cerrar sesión del usuario, Elimina el refresh token del navegador

export async function POST() {
  // Crear respuesta de éxito
  const response = NextResponse.json({ success: true });
  
  // Eliminar el refresh token del navegador
  response.cookies.set('refreshToken', '', {
    maxAge: 0, // Eliminar ahora mismo
    httpOnly: true, // Solo el servidor puede tocarlo (más seguro)
    secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
    sameSite: 'lax', // Protege contra ataques maliciosos
    path: '/'
  });

  return response;
}

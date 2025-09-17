import { NextRequest, NextResponse } from 'next/server';

/**
 * Endpoint para establecer el refresh token, guardar refresh token después del login
 * 
 * - Recibe el refresh token del servidor de login
 * - Lo guarda en una cookie segura en el navegador
 * 
 */
export async function POST(request: NextRequest) {
  try {
    // Obtener el refresh token del cuerpo de la petición
    const { refreshToken } = await request.json();
    
    // Verificar que se envió el token
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 400 });
    }

    // TODO: En producción verificar que el token es válido
    const response = NextResponse.json({ success: true });
    
    // Guardar el refresh token en una cookie súper segura
    response.cookies.set('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 3600, // Dura 7 días
      httpOnly: true, // Solo el servidor puede leerlo (máxima seguridad)
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'lax', // Protege contra ataques maliciosos
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set refresh token' }, { status: 500 });
  }
}

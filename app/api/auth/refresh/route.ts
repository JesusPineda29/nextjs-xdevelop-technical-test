import { NextRequest, NextResponse } from 'next/server';


// Endpoint para renovar el access token
/**
 * - Toma el refresh token (que está guardado de forma segura)
 * - Genera un nuevo access token para usar en la app
 * 
 * - El access token dura poco tiempo (1 hora) por seguridad
 * - Cuando se vence, este endpoint lo renueva automáticamente
 * - El usuario no tiene que hacer login otra vez
 */
export async function POST(request: NextRequest) {
  try {
    // Buscar el refresh token en las cookies
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    // Si no hay refresh token, el usuario no está logueado
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    // Crear un nuevo access token (en producción sería un JWT real)
    const newAccessToken = `access_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const response = NextResponse.json({ 
      accessToken: newAccessToken,
      message: 'Token refreshed successfully' 
    });

    // Guardar el nuevo access token en una cookie que el navegador puede leer
    response.cookies.set('accessToken', newAccessToken, {
      maxAge: 3600, // Dura 1 hora
      httpOnly: false, // El navegador puede leerlo (necesario para hacer peticiones)
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'lax', // Protege contra ataques maliciosos
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
  }
}

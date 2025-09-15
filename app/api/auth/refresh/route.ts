import { NextRequest, NextResponse } from 'next/server';

// Endpoint para renovar el access token
export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    // Simular validación del refresh token con un nuevo access token
    const newAccessToken = `access_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const response = NextResponse.json({ 
      accessToken: newAccessToken,
      message: 'Token refreshed successfully' 
    });

    // Establecer el nuevo access token en cookie accesible por JS con un tiempo de expiración de 1 hora
    response.cookies.set('accessToken', newAccessToken, {
      maxAge: 3600, // 1 hora
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
  }
}

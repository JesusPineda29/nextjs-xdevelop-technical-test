import { NextRequest, NextResponse } from 'next/server';

// Endpoint para establecer el refresh token
export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();
    
    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 400 });
    }

    const response = NextResponse.json({ success: true });
    
    // Establecer refresh token en HttpOnly cookie con un tiempo de expiración de 7 días
    response.cookies.set('refreshToken', refreshToken, {
      maxAge: 7 * 24 * 3600, // 7 días
      httpOnly: true,
      // si es producción, establecer la cookie como segura
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set refresh token' }, { status: 500 });
  }
}

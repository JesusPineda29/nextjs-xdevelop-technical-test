'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getClientCookie } from '@/lib/cookies';

// Página de inicio, redirige a la página de usuarios si el token existe
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verificar si el token existe en la cookie al montar el componente
    const cookieToken = getClientCookie('accessToken');

    if (cookieToken) {
      router.push('/users');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido</h1>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  );
}
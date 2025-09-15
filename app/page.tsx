'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { getClientCookie } from '@/lib/cookies';

export default function Home() {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    // Check if token exists in cookie on mount 
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
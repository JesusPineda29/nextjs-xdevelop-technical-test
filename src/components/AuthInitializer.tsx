'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

// Inicializador de autenticación
export default function AuthInitializer() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Inicializar la autenticación
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Renderizar el componente
  return null;
}

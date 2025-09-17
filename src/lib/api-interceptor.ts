/**
 * Interceptor de peticiones HTTP
 * 
 * - Intercepta todas las peticiones HTTP de la app
 * - Renueva tokens automáticamente cuando expiran
 * - Redirige al login si no puede renovar el token
 * 
 * Este interceptor usa el endpoint /api/auth/refresh internamente
 * para renovar tokens. El interceptor es el "asistente automático" que
 * usa la "herramienta" (endpoint) cuando la necesita.
 */
import { useAuthStore } from '@/store/authStore';

export async function apiRequest(url: string, options: RequestInit = {}) {
  const { refreshToken } = useAuthStore.getState();
  
  // Identificar qué peticiones necesitan autenticación
  const isAuthEndpoint = url.includes('/login') || url.includes('/api/auth/');
  const isPublicEndpoint = url.includes('/users') || url.includes('/register');
  const requiresAuth = (url.includes('reqres.in') || url.includes('jsonplaceholder.typicode.com')) && !isAuthEndpoint && !isPublicEndpoint;
  
  // Hacer la petición inicial
  let response = await fetch(url, {
    ...options,
    credentials: requiresAuth ? 'include' : 'omit'
  });

  // Si la petición falla por token expirado, intentar renovarlo
  if (requiresAuth && response.status === 401) {
    const refreshSuccess = await refreshToken();
    
    if (refreshSuccess) {
      // Reintentar la petición con el nuevo token
      response = await fetch(url, {
        ...options,
        credentials: 'include'
      });
    } else {
      // Si no se puede renovar, cerrar sesión
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
  }

  return response;
}

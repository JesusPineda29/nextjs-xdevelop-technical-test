import { useAuthStore } from '@/store/authStore';

// Interceptor para manejar refresh automático
export async function apiRequest(url: string, options: RequestInit = {}) {
  const { refreshToken } = useAuthStore.getState();
  
  // Solo aplicar interceptor a APIs que requieren autenticación
  // Excluir endpoints de autenticación y endpoints públicos para evitar bucles
  const isAuthEndpoint = url.includes('/login') || url.includes('/api/auth/');
  const isPublicEndpoint = url.includes('/users') || url.includes('/register'); // ReqRes endpoints públicos
  const requiresAuth = (url.includes('reqres.in') || url.includes('jsonplaceholder.typicode.com')) && !isAuthEndpoint && !isPublicEndpoint;
  
  let response = await fetch(url, {
    ...options,
    credentials: requiresAuth ? 'include' : 'omit'
  });

  // Solo intentar refresh si es una API que requiere autenticación
  if (requiresAuth && response.status === 401) {
    const refreshSuccess = await refreshToken();
    
    if (refreshSuccess) {
      // Reintentar la petición original con el nuevo token
      // Usar fetch directamente para evitar bucle infinito
      response = await fetch(url, {
        ...options,
        credentials: 'include'
      });
    } else {
      // Si el refresh falla, hacer logout
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
  }

  return response;
}

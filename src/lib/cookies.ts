/**
 * Utilidades para manejar cookies en el navegador
 * 
 * - Leer cookies del navegador
 * - Crear cookies con opciones de seguridad
 * - Eliminar cookies
 * 
 * - Las cookies son la forma de guardar datos en el navegador
 * - Necesario para autenticación y preferencias del usuario
 * - Manejo seguro con opciones de privacidad
 */

// Leer una cookie del navegador
export function getClientCookie(name: string): string | undefined {
  if (typeof window === 'undefined') return undefined;
  
  const value = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1];
  
  return value;
}

// Crear una cookie en el navegador
export function setClientCookie(name: string, value: string, options?: {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}): void {
  if (typeof window === 'undefined') return;
  
  const maxAge = options?.maxAge || 86400; // 1 día por defecto
  const path = options?.path || '/';
  const secure = options?.secure ? '; secure' : '';
  const sameSite = options?.sameSite ? `; samesite=${options.sameSite}` : '';
  
  document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}${secure}${sameSite}`;
}

// Eliminar una cookie del navegador
export function deleteClientCookie(name: string): void {
  if (typeof window === 'undefined') return;
  
  // Establecer fecha de expiración en el pasado para eliminar
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}

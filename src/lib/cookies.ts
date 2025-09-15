// Client-side cookie utilities (for use in components)
export function getClientCookie(name: string): string | undefined {
  if (typeof window === 'undefined') return undefined;
  
  const value = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1];
  
  return value;
}

// Establecer una cookie en el cliente
export function setClientCookie(name: string, value: string, options?: {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}): void {
  if (typeof window === 'undefined') return;
  
  const maxAge = options?.maxAge || 86400;
  const path = options?.path || '/';
  const secure = options?.secure ? '; secure' : '';
  const sameSite = options?.sameSite ? `; samesite=${options.sameSite}` : '';
  
  document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}${secure}${sameSite}`;
}

// Eliminar una cookie en el cliente
export function deleteClientCookie(name: string): void {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}

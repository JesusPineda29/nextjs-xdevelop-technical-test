'use client';

/**
 * Hook para mostrar notificaciones (toasts)
 * 
 * - Muestra mensajes temporales al usuario (éxito, error, info, advertencia)
 * - Usa la librería Sonner para las notificaciones
 */
import { toast as sonnerToast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  type?: ToastType;
}

// Función para mostrar diferentes tipos de notificaciones
const showToast = (message: string, options?: ToastOptions) => {
  const { type = 'info' } = options || {};
  
  switch (type) {
    case 'success':
      return sonnerToast.success(message);
    case 'error':
      return sonnerToast.error(message);
    case 'warning':
      return sonnerToast.warning(message);
    default:
      return sonnerToast(message);
  }
};

// Hook que devuelve funciones para manejar notificaciones
export const useToast = () => {
  return {
    toast: showToast,
    dismiss: (toastId?: string | number) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
    },
  };
};

// Función directa para usar sin hook (más simple)
export const toast = showToast;

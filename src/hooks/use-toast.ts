'use client';

import { toast as sonnerToast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  type?: ToastType;
}

// Función helper para mostrar toast
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

// Hook simple que envuelve sonner
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

// Función directa para usar sin hook
export const toast = showToast;

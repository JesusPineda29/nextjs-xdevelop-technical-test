'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try { 
      await login(email, password);
      toast.success('Inicio de sesión exitoso!');
      router.push('/users');
    } catch (error) {
      toast.error('Error al iniciar sesión. Por favor, verifique su correo y contraseña.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-full max-w-md rounded-lg border bg-white shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">Correo electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@admin.com"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="admin123"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none h-10 px-4"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            <div className="h-10"></div>

            <div className="text-sm text-gray-600 text-center space-y-3">
              <div className="space-y-2">
                <p className="font-medium">Usuarios disponibles:</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded">
                    <p><strong>Admin:</strong> admin@admin.com / admin123</p>
                    <p className="text-xs text-gray-600">Puede crear y editar posts</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <p><strong>User:</strong> user@user.com / user123</p>
                    <p className="text-xs text-gray-600">Solo puede ver posts</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

// Barra de navegación
export default function Navigation() {
  const { user, logout, role } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Renderizar la barra de navegación
  if (!user) return null;

  const navItems = [
    { href: '/users', label: 'Usuarios' },
    { href: '/posts', label: 'Posts' },
    { href: '/books', label: 'Libros' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 py-2 px-2 sm:py-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Enlaces de navegación - más compactos en móviles */}
        <div className="flex space-x-2 sm:space-x-3 md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 sm:px-3 sm:py-2 rounded-md text-sm sm:text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        {/* Usuario y botón de cierre de sesión */}
        <div className="flex items-center">
          {/* Ocultar mensaje de bienvenida en móviles */}
          <span className="hidden sm:block text-sm text-gray-700">
            Bienvenido {user.first_name || user.email}
          </span>
          {/* Botón de cierre de sesión más compacto en móviles */}
          <button
            onClick={handleLogout}
            className="ml-2 sm:ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm sm:text-sm font-medium transition-colors border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 h-8 px-3 sm:h-9 sm:px-3"
          >
            <span className="hidden sm:inline">Cerrar sesión</span>
            <span className="sm:hidden">Salir</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
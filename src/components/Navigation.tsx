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
    <nav className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex space-x-6">
          {/* Renderizar los items de navegación */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        {/* Renderizar el usuario y el botón de cierre de sesión */}
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Bienvenido {user.first_name || user.email}
          </span>
          {/* Renderizar el botón de cierre de sesión */}
          <button
            onClick={handleLogout}
            className="ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 h-9 px-3"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
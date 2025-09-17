'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Componente de paginación
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (!totalPages || totalPages <= 1) return null;

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  // Renderizar el componente de paginación
  return (
    <div className="flex items-center justify-between">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none h-9 px-3"
      >
        {/* En móvil solo flecha, en desktop texto + flecha */}
        <ChevronLeftIcon className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">Anterior</span>
      </button>

      {/* Números de página - solo visibles en desktop */}
      <div className="hidden md:flex space-x-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-9 px-3 rounded-md text-sm font-medium transition-colors border ${
              page === currentPage
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Información de página actual - solo visible en móvil */}
      <div className="md:hidden flex items-center">
        <span className="text-sm text-gray-600">
          {currentPage} de {totalPages}
        </span>
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none h-9 px-3"
      >
        {/* En móvil solo flecha, en desktop texto + flecha */}
        <span className="hidden sm:inline mr-1">Siguiente</span>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}



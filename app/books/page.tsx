'use client';

import { useState } from 'react';
import { useBooks } from '@/hooks/useApi';
import BooksList from '@/components/BooksList';
import { Search } from 'lucide-react';

// Página de libros con búsqueda y filtros

export default function BooksPage() {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [authorFilter, setAuthorFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  // Filtros de búsqueda
  const filters = {
    author: authorFilter || undefined,
    year: yearFilter ? parseInt(yearFilter) : undefined,
  };

  const { data, isLoading, error } = useBooks(searchTerm, currentPage, filters);

  // Manejar el evento de búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(query);
    setCurrentPage(1);
  };

  // Manejar el evento de cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Renderizar el componente
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Libros</h1>
        <p className="text-gray-600 mt-1">Buscar y descubrir libros</p>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar libros..."
              className="pl-10 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none h-10 px-4"
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        <div className="flex gap-4 max-w-md">
          <input
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            placeholder="Filtrar por autor..."
            className="flex-1 flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          />
          <input
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            placeholder="Filtrar por año..."
            type="number"
            min="1000"
            max="2024"
            className="w-40 flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          />
        </div>
      </div>

      {/* Renderizar el error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error buscando libros. Por favor, intente nuevamente.
        </div>
      )}

      {/* Renderizar el loading */}
      {isLoading && searchTerm && (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-600">Buscando libros...</p>
        </div>
      )}

      {/* Renderizar la lista de libros */}
      {data && searchTerm && (
        <BooksList
          books={data.docs || []}
          currentPage={currentPage}
          totalResults={data.numFound || 0}
          onPageChange={handlePageChange}
        />
      )}

      {/* Renderizar el mensaje de búsqueda */}
      {!searchTerm && (
        <div className="text-center py-12 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Ingrese un término de búsqueda para encontrar libros</p>
        </div>
      )}
    </div>
  );
}
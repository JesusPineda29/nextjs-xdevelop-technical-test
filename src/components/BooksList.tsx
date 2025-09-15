'use client';

import { useState } from 'react';
import { Book } from '@/types';
import Pagination from '@/components/Pagination';
import BookModal from '@/components/BookModal';
import { BOOKS_PER_PAGE } from '@/config/api';

interface BooksListProps {
  books: Book[];
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

// Lista de libros
export default function BooksList({ books, currentPage, totalResults, onPageChange }: BooksListProps) {
  const totalPages = Math.ceil(totalResults / BOOKS_PER_PAGE);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Manejar el clic en un libro
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Manejar el cierre del modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // Renderizar la lista de libros
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {/* Renderizar los libros */}
        {books.map((book) => (
          <div 
            key={book.key} 
            className="group h-full rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
            onClick={() => handleBookClick(book)}
          >
            <div className="flex flex-col p-6 space-y-1.5">
              <h3 className="text-lg font-semibold leading-none tracking-tight line-clamp-2 transition-colors duration-300 group-hover:text-blue-600">{book.title}</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-2 text-sm text-gray-600">
                {book.author_name && (
                  <p><strong>Author:</strong> {book.author_name.slice(0, 2).join(', ')}</p>
                )}
                {book.first_publish_year && (
                  <p><strong>First Published:</strong> {book.first_publish_year}</p>
                )}
              </div>
              {book.cover_i && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="mt-3 w-full h-32 object-cover rounded"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Renderizar el mensaje de no libros */}
      {books.length === 0 && (
        <div className="text-center py-8 text-gray-500">
           No se encontraron libros. Intente con un término de búsqueda diferente.
        </div>
      )}

      {/* Renderizar el componente de paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      {/* Renderizar el modal de libro */}
      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { getBookDetails, getAuthorDetails } from '@/config/api';

interface BookDetails {
  title: string;
  authors?: Array<{
    author: {
      key: string;
    };
  }>;
  publish_date?: string;
  publishers?: string[];
  number_of_pages?: number;
  subjects?: string[];
  description?: string | { value: string };
  covers?: number[];
  isbn_10?: string[];
  isbn_13?: string[];
  languages?: Array<{
    key: string;
  }>;
}

interface AuthorDetails {
  name: string;
  key: string;
}

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

// Modal de libro
export default function BookModal({ book, isOpen, onClose }: BookModalProps) {
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [authors, setAuthors] = useState<AuthorDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener los detalles del libro
  useEffect(() => {
    if (book && isOpen) {
      fetchBookDetails();
    } else {
      // Limpiar estado cuando se cierra el modal
      setBookDetails(null);
      setAuthors([]);
      setError(null);
    }
  }, [book, isOpen]);

  // Obtener los detalles del libro
  const fetchBookDetails = async () => {
    if (!book) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Extraer el ID del libro de la key 
      const workId = book.key.replace('/works/', '');
      
      // Usar la función centralizada de API
      const data = await getBookDetails(workId);
      setBookDetails(data);
      
      // Obtener información de los autores si están disponibles
      if (data.authors && data.authors.length > 0) {
        const authorPromises = data.authors.map(async (authorRef: any) => {
          try {
            const authorId = authorRef.author.key.replace('/authors/', '');
            const authorData = await getAuthorDetails(authorId);
            return {
              name: authorData.name || 'Autor desconocido',
              key: authorRef.author.key
            };
          } catch (err) {
            console.error('Error fetching author:', err);
          }
          return null;
        });
        
        const authorResults = await Promise.all(authorPromises);
        const validAuthors = authorResults.filter(author => author !== null) as AuthorDetails[];
        setAuthors(validAuthors);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los detalles');
    } finally {
      setLoading(false);
    }
  };

  // Obtener la descripción del libro
  const getDescription = () => {
    if (!bookDetails?.description) return 'Descripción no disponible';
    
    if (typeof bookDetails.description === 'string') {
      return bookDetails.description;
    }
    
    if (typeof bookDetails.description === 'object' && 'value' in bookDetails.description) {
      return bookDetails.description.value;
    }
    
    return 'Descripción no disponible';
  };

  // Obtener los autores del libro
  const getAuthors = () => {
    if (authors && authors.length > 0) {
      return authors.map(author => author.name).join(', ');
    }
    if (book?.author_name && book.author_name.length > 0) {
      return book.author_name.join(', ');
    }
    return 'Autor no disponible';
  };

  // Obtener la imagen de la portada del libro
  const getCoverImage = () => {
    if (bookDetails?.covers && bookDetails.covers.length > 0) {
      return `https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`;
    }
    if (book?.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    }
    return null;
  };

  if (!isOpen) return null;

  // Manejar el clic en el fondo del modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Renderizar el modal
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {book?.title || 'Detalles del Libro'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Cargando detalles...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {bookDetails && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Imagen del libro */}
              <div className="md:col-span-1">
                {getCoverImage() && (
                  <img
                    src={getCoverImage()!}
                    alt={book?.title || 'Portada del libro'}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                )}
              </div>

              {/* Información del libro */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Información General</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Autor(es):</strong> {getAuthors()}</p>
                    <p><strong>Título:</strong> {bookDetails.title}</p>
                    {bookDetails.publish_date && (
                      <p><strong>Fecha de publicación:</strong> {bookDetails.publish_date}</p>
                    )}
                    {bookDetails.publishers && bookDetails.publishers.length > 0 && (
                      <p><strong>Editorial:</strong> {bookDetails.publishers.join(', ')}</p>
                    )}
                    {bookDetails.number_of_pages && (
                      <p><strong>Páginas:</strong> {bookDetails.number_of_pages}</p>
                    )}
                    {bookDetails.isbn_10 && bookDetails.isbn_10.length > 0 && (
                      <p><strong>ISBN-10:</strong> {bookDetails.isbn_10[0]}</p>
                    )}
                    {bookDetails.isbn_13 && bookDetails.isbn_13.length > 0 && (
                      <p><strong>ISBN-13:</strong> {bookDetails.isbn_13[0]}</p>
                    )}
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {getDescription()}
                  </p>
                </div>

                {/* Temas */}
                {bookDetails.subjects && bookDetails.subjects.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Temas</h3>
                    <div className="flex flex-wrap gap-2">
                      {bookDetails.subjects.slice(0, 10).map((subject, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

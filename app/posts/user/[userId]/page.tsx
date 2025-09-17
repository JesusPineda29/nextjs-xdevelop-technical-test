'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePostsByUser } from '@/hooks/useApi';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { ArrowLeft, User } from 'lucide-react';

// Página de posts por usuario con paginación
export default function UserPostsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = parseInt(params.userId as string);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: posts, isLoading, error } = usePostsByUser(userId, currentPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-600">Cargando posts del usuario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-600">Error cargando posts del usuario. Por favor, intente nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          <h1 className="text-3xl font-bold text-gray-900">Posts del Usuario {userId}</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{posts?.length || 0}</span> posts encontrados
          </div>
          <div className="text-sm text-gray-600">
            Página {currentPage}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {posts && posts.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(posts.length / 9)} // Aproximación simple
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay posts</h3>
          <p className="text-gray-600">Este usuario no tiene posts publicados.</p>
        </div>
      )}
    </div>
  );
}


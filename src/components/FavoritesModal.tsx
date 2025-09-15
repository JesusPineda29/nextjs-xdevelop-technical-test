'use client';

import { usePostsStore } from '@/store/postsStore';
import { usePostsLocalStore } from '@/store/postsLocalStore';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/config/api';
import { X, Heart, MessageCircle } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Modal de favoritos
export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites, removeFavorite } = usePostsStore();
  const { getAllLocalPosts, isPostDeleted } = usePostsLocalStore();

  // Obtener todos los posts de la API para encontrar los favoritos
  const { data: allApiPosts, isLoading } = useQuery({
    queryKey: ['all-posts-for-favorites'],
    queryFn: async () => {
      // Obtener todos los posts de la API (hasta 100)
      const posts = [];
      for (let page = 1; page <= 12; page++) {
        const pagePosts = await getPosts(page, 9);
        posts.push(...pagePosts);
      }
      return posts;
    },
    enabled: isOpen && favorites.length > 0,
  });

  const localPosts = getAllLocalPosts();
  const allPosts = [...localPosts, ...(allApiPosts || [])];
  
  // Filtrar posts eliminados y solo los posts favoritos
  const favoritePosts = allPosts.filter(post => 
    favorites.includes(post.id) && !isPostDeleted(post.id)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-600 fill-red-600" />
            Posts Favoritos ({favoritePosts.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-600">Cargando posts favoritos...</p>
            </div>
          ) : favoritePosts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No tienes posts favoritos</p>
              <p className="text-gray-400 text-sm mt-2">
                Haz clic en el corazón de cualquier post para agregarlo a favoritos
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {favoritePosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold line-clamp-2 flex-1 pr-2">
                      {post.title}
                    </h3>
                    <button
                      onClick={() => removeFavorite(post.id)}
                      className="p-1 hover:bg-red-50 rounded-full transition-colors"
                      title="Quitar de favoritos"
                    >
                      <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {post.body}
                  </p>
                  
                  <div className="text-xs text-gray-500">
                    <span>Usuario: {post.userId}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

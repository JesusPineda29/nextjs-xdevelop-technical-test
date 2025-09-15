'use client';

import { useState } from 'react';
import { usePosts, usePostsTotal, useCreatePost } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import { usePostsStore } from '@/store/postsStore';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import FavoritesModal from '@/components/FavoritesModal';
import { toast } from 'sonner';
import { Heart, Plus } from 'lucide-react';

export default function PostsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  
  const { data: posts, isLoading, error } = usePosts(currentPage);
  const { data: totalPages = 10 } = usePostsTotal();
  const { role } = useAuthStore();
  const { favorites } = usePostsStore();
  const createPostMutation = useCreatePost();

  console.log('Posts data:', posts);
  console.log('Current page:', currentPage);
  console.log('Total pages:', totalPages);
  console.log('Create mutation status:', createPostMutation.status);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.title || !newPost.body) {
      toast.error('Por favor, complete todos los campos');
      return;
    }

    try {
      console.log('Creating post:', newPost);
      const result = await createPostMutation.mutateAsync({
        ...newPost,
        userId: Date.now(), // Usar timestamp para userId único
      });
      console.log('Post created successfully:', result);
      
        toast.success('Post creado correctamente!');
      setNewPost({ title: '', body: '' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error al crear el post');
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-600">Cargando posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-600">Error cargando posts. Por favor, intente nuevamente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-1">Navegar y gestionar posts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFavoritesModal(true)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-red-600 text-red-600 bg-white hover:bg-red-50 h-10 px-4"
          >
            <Heart className="w-4 h-4 mr-2 fill-red-600" />
            Favoritos ({favorites.length})
          </button>
          
          {role === 'admin' && (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800 h-10 px-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              {showCreateForm ? 'Cancelar' : 'Crear Post'}
            </button>
          )}
        </div>
      </div>

      {showCreateForm && role === 'admin' && (
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="flex flex-col p-6 space-y-1.5">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Crear Nuevo Post</h3>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium leading-none">Título</label>
                <input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Ingrese el título del post"
                  required
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="body" className="text-sm font-medium leading-none">Contenido</label>
                <textarea
                  id="body"
                  value={newPost.body}
                  onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                  placeholder="Ingrese el contenido del post"
                  rows={4}
                  required
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={createPostMutation.isPending}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none h-10 px-4"
              >
                {createPostMutation.isPending ? 'Creando...' : 'Crear Post'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post, index) => (
          <PostCard key={`post-${post.id}-${index}`} post={post} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <FavoritesModal
        isOpen={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
      />
    </div>
  );
}
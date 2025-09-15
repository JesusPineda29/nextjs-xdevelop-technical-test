'use client';

import { useState } from 'react';
import { Post, Comment } from '@/types';
import { usePostsStore } from '@/store/postsStore';
import { useComments, useUpdatePost, useDeletePost } from '@/hooks/useApi';
import { Heart, MessageCircle, ChevronDown, ChevronUp, Edit2, Save, X, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import ConfirmModal from './ConfirmModal';

interface PostCardProps {
  post: Post;
}
// Tarjeta de post con acciones y comentarios
export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: post.title, body: post.body });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { favorites, addFavorite, removeFavorite } = usePostsStore();
  const { data: comments, isLoading: commentsLoading } = useComments(showComments ? post.id : 0);
  const { role } = useAuthStore();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();
  
  const isFavorite = favorites.includes(post.id);


  // Manejar el clic en el botón de favorito
  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(post.id);
    } else {
      addFavorite(post.id);
    }
  };

  // Manejar el clic en el botón de comentarios
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // Manejar el clic en el botón de editar
  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ title: post.title, body: post.body });
  };

  // Manejar el clic en el botón de cancelar edición
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ title: post.title, body: post.body });
  };

  // Manejar el clic en el botón de guardar edición
  const handleSaveEdit = async () => {
    if (!editData.title || !editData.body) {
      toast.error('Por favor, complete todos los campos');
      return;
    }

    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        title: editData.title,
        body: editData.body,
        userId: post.userId,
      });
      toast.success('Post actualizado correctamente!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Error al actualizar el post');
    }
  };

  // Manejar el clic en el botón de eliminar post
  const handleDeletePost = () => {
    setShowDeleteConfirm(true);
  };

  // Confirmar eliminación del post
  const confirmDeletePost = async () => {
    try {
      await deletePostMutation.mutateAsync(post.id);
      toast.success('Post eliminado correctamente!');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error al eliminar el post');
    }
  };

  // Renderizar la tarjeta de post
  return (
    <div className={`w-full rounded-lg border shadow-sm bg-white`}>
      <div className="flex flex-col p-6 space-y-1.5">
        <div className="flex items-center gap-2">
          {/* Renderizar el input de edición */}
          {isEditing ? (
            <input
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="text-lg font-semibold leading-none tracking-tight border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-900 flex-1"
              placeholder="Título del post"
            />
          ) : (
            <h3 className="text-lg font-semibold leading-none tracking-tight line-clamp-2 flex-1">{post.title}</h3>
          )}
   

   
        </div>
      </div>
      <div className="p-6 pt-0">
        {isEditing ? (
          <textarea
            value={editData.body}
            onChange={(e) => setEditData({ ...editData, body: e.target.value })}
            className="w-full text-gray-600 mb-4 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-900 min-h-[100px]"
            placeholder="Contenido del post"
          />
        ) : (
          <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          {!isEditing && (
            <>
              <button
                onClick={handleFavorite}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border h-9 px-3 ${
                  isFavorite
                    ? 'border-red-600 text-red-600 bg-white hover:bg-red-50'
                    : 'border-gray-300 text-gray-800 bg-white hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 mr-1 ${isFavorite ? 'fill-red-600' : ''}`} />
                {isFavorite ? 'Quitar favorito' : 'Agregar favorito'}
              </button>

              <button
                onClick={toggleComments}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 h-9 px-3"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Comentarios
                {showComments ? (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </button>

              {role === 'admin' && (
                <>
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 h-9 px-3"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Editar
                  </button>
                  
                  <button
                    onClick={handleDeletePost}
                    disabled={deletePostMutation.isPending}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-red-600 text-red-600 bg-white hover:bg-red-50 disabled:opacity-50 h-9 px-3"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    {deletePostMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </>
              )}
            </>
          )}

          {isEditing && (
            <>
              <button
                onClick={handleSaveEdit}
                disabled={updatePostMutation.isPending}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-green-600 text-green-600 bg-white hover:bg-green-50 disabled:opacity-50 h-9 px-3"
              >
                <Save className="w-4 h-4 mr-1" />
                {updatePostMutation.isPending ? 'Guardando...' : 'Guardar'}
              </button>

              <button
                onClick={handleCancelEdit}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 h-9 px-3"
              >
                <X className="w-4 h-4 mr-1" />
                Cancelar
              </button>
            </>
          )}
        </div>

        {showComments && (
          <div className="mt-4 border-t pt-4">
            {commentsLoading ? (
              <p className="text-gray-500">Cargando comentarios...</p>
            ) : (
              <div className="space-y-3">
                {comments?.slice(0, 3).map((comment: Comment) => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-sm text-gray-700">{comment.name}</div>
                    <div className="text-xs text-gray-500 mb-1">{comment.email}</div>
                    <p className="text-sm text-gray-600">{comment.body}</p>
                  </div>
                ))}
                {comments && comments.length > 3 && (
                  <p className="text-sm text-gray-500 text-center">
                    Y {comments.length - 3} más comentarios...
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de confirmación para eliminar post */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeletePost}
        title="Eliminar Post"
        message="¿Estás seguro de que quieres eliminar este post? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}
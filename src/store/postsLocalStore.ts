/**
 * Store de posts locales (localStorage)
 * 
 * - Guarda posts creados por el usuario en localStorage
 * - Marca posts eliminados (soft delete)
 * - Genera IDs únicos para nuevos posts
 * 
 * - Los posts creados persisten aunque se recargue la página
 * - Permite "eliminar" posts de la API sin afectar otros usuarios
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Post } from '@/types';
import { generateUniqueId } from '@/lib/utils';

interface PostsLocalState {
  localPosts: Post[];
  deletedPostIds: number[];
  addLocalPost: (post: Omit<Post, 'id'>) => Post;
  updateLocalPost: (id: number, post: Partial<Post>) => void;
  deleteLocalPost: (id: number) => void;
  markPostAsDeleted: (id: number) => void;
  isPostDeleted: (id: number) => boolean;
  getLocalPost: (id: number) => Post | undefined;
  getAllLocalPosts: () => Post[];
  clearUserData: () => void;
}

// Store de posts locales
export const usePostsLocalStore = create<PostsLocalState>()(
  // persistencia de los posts locales
  persist(
    (set, get) => ({
      localPosts: [],
      deletedPostIds: [],
      
      // Añadir un post local
      addLocalPost: (post: Omit<Post, 'id'>) => {
        const { localPosts } = get();
        // obtener los ids existentes
        const existingIds = localPosts.map(p => p.id);
        const uniqueId = generateUniqueId(existingIds);
        
        // crear un nuevo post
        const newPost: Post = {
          ...post,
          id: uniqueId,
        };
        
        // actualizar el estado
        set((state) => ({
          localPosts: [...state.localPosts, newPost]
        }));
        
        return newPost;
      },
      
      // Actualizar un post local
      updateLocalPost: (id: number, updatedPost: Partial<Post>) => {
        set((state) => ({
          localPosts: state.localPosts.map(post =>
            post.id === id ? { ...post, ...updatedPost } : post
          )
        }));
      },
      
      // Eliminar un post local
      deleteLocalPost: (id: number) => {
        set((state) => ({
          localPosts: state.localPosts.filter(post => post.id !== id)
        }));
      },
      
      // Marcar un post como eliminado
      markPostAsDeleted: (id: number) => {
        set((state) => ({
          deletedPostIds: [...state.deletedPostIds, id]
        }));
      },
      
      // Verificar si un post está eliminado
      isPostDeleted: (id: number) => {
        return get().deletedPostIds.includes(id);
      },
      
      // Obtener un post local
      getLocalPost: (id: number) => {
        return get().localPosts.find(post => post.id === id);
      },
      
      // Obtener todos los posts locales
      getAllLocalPosts: () => {
        return get().localPosts;
      },
      
      // Limpiar datos del usuario actual
      clearUserData: () => {
        set({ localPosts: [], deletedPostIds: [] });
        // Limpiar también la persistencia
        localStorage.removeItem('posts-local-storage');
      },
    }),
    {
      name: 'posts-local-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

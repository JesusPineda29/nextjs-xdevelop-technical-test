/**
 * Hooks para manejar datos de APIs
 * 
 * - Conecta los componentes con las APIs externas
 * - Maneja caché automático de datos (TanStack Query)
 * - Combina datos de API con datos locales (localStorage)
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Post, Comment, UsersResponse } from '@/types';
import { reqresRequest, getPosts, getPostsByUser, getPostComments, searchBooks, createPost, updatePost, deletePost, BOOKS_PER_PAGE } from '@/config/api';
import { usePostsLocalStore } from '@/store/postsLocalStore';
import { usePostsStore } from '@/store/postsStore';

// Hook para obtener usuarios de la API ReqRes
export const useUsers = (page: number = 1) => {
  return useQuery<UsersResponse>({
    queryKey: ['users', page], // Clave única para el caché
    queryFn: async () => {
      return reqresRequest(`/users?page=${page}`);
    },
  });
};

// Hook para obtener posts (combina API + datos locales)
export const usePosts = (page: number = 1) => {
  return useQuery<Post[]>({
    queryKey: ['posts', page],
    queryFn: async () => {
      const apiPosts = await getPosts(page, 9);
      const { getAllLocalPosts, isPostDeleted } = usePostsLocalStore.getState();
      const localPosts = getAllLocalPosts();
      
      // Filtrar posts de la API que han sido marcados como eliminados
      const filteredApiPosts = apiPosts.filter((post: Post) => !isPostDeleted(post.id));
      
      // Solo agregar posts locales en la primera página
      if (page === 1) {
        return [...localPosts, ...filteredApiPosts];
      } else {
        return filteredApiPosts;
      }
    },
  });
};

// Hook para obtener los posts por usuario
export const usePostsByUser = (userId: number, page: number = 1) => {
  return useQuery<Post[]>({
    queryKey: ['posts', 'user', userId, page],
    queryFn: async () => {
      const apiPosts = await getPostsByUser(userId, page, 9);
      const { isPostDeleted } = usePostsLocalStore.getState();
      
      // Filtrar posts de la API que han sido marcados como eliminados
      return apiPosts.filter((post: Post) => !isPostDeleted(post.id));
    },
    enabled: !!userId,
  });
};

// Hook para obtener el total de posts (solo se ejecuta una vez al inicio)
export const usePostsTotal = () => {
  return useQuery<number>({
    queryKey: ['posts-total'],
    queryFn: async () => {
      const localPosts = usePostsLocalStore.getState().getAllLocalPosts();
      const localPostsCount = localPosts.length;
      
      // JSONPlaceholder siempre tiene exactamente 100 posts
      // Los posts locales se agregan a la primera página, así que no afectan el total de páginas
      return 12; // 100 posts / 9 por página = 12 páginas (redondeado hacia arriba)
    },
    staleTime: Infinity, // Nunca se vuelve a ejecutar
  });
};

// Hook para obtener los comentarios de un post
export const useComments = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      return getPostComments(postId);
    },
    enabled: !!postId,
  });
};


// Hook para crear un post (guarda en API + localStorage)
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { addLocalPost } = usePostsLocalStore();
  
  return useMutation({
    mutationFn: async (post: { title: string; body: string; userId: number }) => {
      // Intentar crear en la API (aunque no persista)
      try {
        await createPost(post);
      } catch (error) {
        console.log('API create failed, using local storage');
      }
      
      // Guardar localmente para que persista
      const newPost = addLocalPost({
        ...post,
      });
      
      return newPost;
    },
    onSuccess: () => {
      // Refrescar la lista de posts para mostrar el nuevo
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', 1] });
    },
  });
};

// Hook para actualizar un post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { updateLocalPost, getLocalPost } = usePostsLocalStore();
  
  return useMutation({
    mutationFn: async ({ id, ...post }: { id: number; title: string; body: string; userId: number }) => {
      // Verificar si es un post local
      const localPost = getLocalPost(id);
      
      if (localPost) {
        // Es un post local, actualizar localmente
        updateLocalPost(id, post);
        return { ...localPost, ...post };
      } else {
        // Es un post de la API, intentar actualizar (aunque no persista)
        try {
          await updatePost(id, post);
        } catch (error) {
          console.log('API update failed, creating local copy');
        }
        
        // Marcar el post original como eliminado y crear una versión actualizada local
        const { markPostAsDeleted, addLocalPost } = usePostsLocalStore.getState();
        markPostAsDeleted(id);
        
        // Crear una copia local del post actualizado
        const updatedPost = { id, ...post };
        const newLocalPost = addLocalPost(updatedPost);
        return newLocalPost;
      }
    },
    onSuccess: () => {
      // Invalidar todas las queries de posts para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // También invalidar la primera página específicamente para mostrar los posts locales
      queryClient.invalidateQueries({ queryKey: ['posts', 1] });
    },
  });
};

// Hook para eliminar un post
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { deleteLocalPost, getLocalPost, markPostAsDeleted } = usePostsLocalStore();
  const { removeFavorite } = usePostsStore();
  
  return useMutation({
    mutationFn: async (id: number) => {
      // Verificar si es un post local
      const localPost = getLocalPost(id);
      
      if (localPost) {
        // Es un post local, eliminar completamente
        deleteLocalPost(id);
        return { id, deleted: true };
      } else {
        // Es un post de la API, intentar eliminar (aunque no persista)
        try {
          await deletePost(id);
        } catch (error) {
          console.log('API delete failed, but marking as deleted locally');
        }
        
        // Marcar como eliminado para que no aparezca en futuras cargas
        markPostAsDeleted(id);
        return { id, deleted: true };
      }
    },
    onSuccess: (data) => {
      // Remover de favoritos si estaba marcado como favorito
      removeFavorite(data.id);
      
      // Invalidar todas las queries de posts para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', 1] });
      // Invalidar también la query de favoritos para actualizar el modal
      queryClient.invalidateQueries({ queryKey: ['all-posts-for-favorites'] });
    },
  });
};

// Hook para buscar libros en OpenLibrary
export const useBooks = (query: string, page: number = 1, filters?: { author?: string; year?: number }) => {
  return useQuery({
    queryKey: ['books', query, page, filters],
    queryFn: async () => {
      if (!query) {
        return { docs: [], numFound: 0 };
      }
      
      let searchQuery = query;
      
      // Añadir filtros de búsqueda
      if (filters?.author) {
        searchQuery += ` author:${encodeURIComponent(filters.author)}`;
      }
      
      if (filters?.year) {
        searchQuery += ` first_publish_year:${filters.year}`;
      }
      
      return searchBooks(searchQuery, page, BOOKS_PER_PAGE);
    },
    enabled: !!query, // Solo buscar si hay query
  });
};
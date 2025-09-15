// Configuración de las APIs
import { apiRequest } from '@/lib/api-interceptor';

// Número de libros por página
export const BOOKS_PER_PAGE = 15;

export const API_CONFIG = {
  // Configuración de las APIs
  // ReqRes API
  REQRES_BASE_URL: 'https://reqres.in/api',
  REQRES_API_KEY: process.env.NEXT_PUBLIC_REQRES_API_KEY || 'demo-key',
  
  // OpenLibrary API
  OPENLIBRARY_BASE_URL: 'https://openlibrary.org',
  
  // JSONPlaceholder API
  JSONPLACEHOLDER_BASE_URL: 'https://jsonplaceholder.typicode.com',
  
  // Headers por defecto para ReqRes
  getReqResHeaders: () => ({
    'Content-Type': 'application/json',
    'x-api-key': API_CONFIG.REQRES_API_KEY,
  }),
  
  // Headers por defecto para otras APIs
  getDefaultHeaders: () => ({
    'Content-Type': 'application/json',
  }),
  
  // Endpoints
  endpoints: {
    // ReqRes
    login: '/login',
    users: '/users',
    register: '/register',
    
    // OpenLibrary
    searchBooks: '/search.json',
    work: '/works',
    author: '/authors',
    
    // JSONPlaceholder
    posts: '/posts',
    comments: '/comments',
  }
};

// Función helper para hacer requests a ReqRes (con interceptor)
export const reqresRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_CONFIG.REQRES_BASE_URL}${endpoint}`;
  
  const response = await apiRequest(url, {
    ...options,
    headers: {
      ...API_CONFIG.getReqResHeaders(),
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

// Función helper para login (sin interceptor para evitar bucles)
export const reqresLoginRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_CONFIG.REQRES_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...API_CONFIG.getReqResHeaders(),
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

// Función helper para hacer requests a OpenLibrary
export const openLibraryRequest = async (endpoint: string, options: RequestInit = {}) => {
  // Si el endpoint ya es una URL completa, usarla directamente
  const url = endpoint.startsWith('http') ? endpoint : `${API_CONFIG.OPENLIBRARY_BASE_URL}${endpoint}`;
  
  console.log('🌐 URL final:', url);
  
  const response = await apiRequest(url, {
    ...options,
    headers: {
      ...API_CONFIG.getDefaultHeaders(),
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

// Función helper para hacer requests a JSONPlaceholder
export const jsonPlaceholderRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_CONFIG.JSONPLACEHOLDER_BASE_URL}${endpoint}`;
  
  const response = await apiRequest(url, {
    ...options,
    headers: {
      ...API_CONFIG.getDefaultHeaders(),
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

// FUNCIONES ESPECÍFICAS PARA OPENLIBRARY 

// Buscar libros
export const searchBooks = async (query: string, page: number = 1, limit: number = BOOKS_PER_PAGE) => {
  const offset = (page - 1) * limit; // calcular el offset para la paginación
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}`;
  
  const response = await apiRequest(url);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

// Obtener detalles de un libro (work)
export const getBookDetails = async (workId: string) => {
  const url = `https://openlibrary.org/works/${workId}.json`;
  
  const response = await apiRequest(url);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

// Obtener detalles de un autor
export const getAuthorDetails = async (authorId: string) => {
  const url = `https://openlibrary.org/authors/${authorId}.json`;
  
  const response = await apiRequest(url);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

// FUNCIONES ESPECÍFICAS PARA JSONPLACEHOLDER 

// Obtener posts
export const getPosts = async (page: number = 1, limit: number = 10) => {
  const start = (page - 1) * limit;
  return jsonPlaceholderRequest(`${API_CONFIG.endpoints.posts}?_start=${start}&_limit=${limit}`);
};

// Obtener posts por usuario
export const getPostsByUser = async (userId: number, page: number = 1, limit: number = 10) => {
  const start = (page - 1) * limit;
  return jsonPlaceholderRequest(`${API_CONFIG.endpoints.posts}?userId=${userId}&_start=${start}&_limit=${limit}`);
};

// Obtener comentarios de un post
export const getPostComments = async (postId: number) => {
  return jsonPlaceholderRequest(`${API_CONFIG.endpoints.comments}?postId=${postId}`);
};

// Crear un post
export const createPost = async (post: { title: string; body: string; userId: number }) => {
  return jsonPlaceholderRequest(API_CONFIG.endpoints.posts, {
    method: 'POST',
    body: JSON.stringify(post),
  });
};

// Actualizar un post
export const updatePost = async (id: number, post: { title: string; body: string; userId: number }) => {
  return jsonPlaceholderRequest(`${API_CONFIG.endpoints.posts}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, ...post }),
  });
};

// Eliminar un post
export const deletePost = async (id: number) => {
  return jsonPlaceholderRequest(`${API_CONFIG.endpoints.posts}/${id}`, {
    method: 'DELETE',
  });
};

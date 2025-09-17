/**
 * Tipos de datos para la aplicación
 * 
 * - User: Usuario con roles simulados
 * - Post: Post con comentarios
 * - Comment: Comentario de un post
 * - Book: Libro con autores y año de publicación
 */


export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role?: 'admin' | 'user' | 'moderator'; // Rol simulado
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}


export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface LoginResponse {
  token: string;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
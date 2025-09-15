import { create } from 'zustand';
import { User } from '@/types';
import { reqresRequest, reqresLoginRequest } from '@/config/api';
import { setClientCookie, deleteClientCookie, getClientCookie } from '@/lib/cookies';
import { apiRequest } from '@/lib/api-interceptor';
import { usePostsStore } from './postsStore';
import { usePostsLocalStore } from './postsLocalStore';
import { useUsersStore } from './usersStore';

// Usuarios válidos guardados en el store
const VALID_USERS = [
  { email: 'admin@admin.com', password: 'admin123', role: 'admin' as const, name: 'Admin User' },
  { email: 'user@user.com', password: 'user123', role: 'user' as const, name: 'Usuario User' }
];

interface AuthState {
  user: User | null;
  token: string | null;
  role: 'admin' | 'user';
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  initializeAuth: () => void;
  refreshToken: () => Promise<boolean>;
}

// Store de autenticación
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  role: 'user',
  
  // Login
  login: async (email: string, password: string) => {
    try {
      // Validar usuario en nuestro array de usuarios válidos
      const validUser = VALID_USERS.find(u => u.email === email && u.password === password);
      
      if (!validUser) {
        throw new Error('Invalid credentials');
      }

      // Simular llamada a ReqRes para obtener token (usando credenciales válidas)
      const data = await reqresLoginRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ 
          email: 'eve.holt@reqres.in', // Usar credenciales válidas de ReqRes
          password: 'cityslicka' 
        }),
      });

      const token = data.token;
      const refreshToken = `refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store access token in cookie (accessible by JS)
      setClientCookie('accessToken', token, { maxAge: 3600 }); // 1 hora
      
      // Store refresh token in HttpOnly cookie via API
      await apiRequest('/api/auth/set-refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      
      const user: User = {
        id: validUser.role === 'admin' ? 1 : 2,
        email: validUser.email,
        first_name: validUser.name.split(' ')[0],
        last_name: validUser.name.split(' ')[1] || '',
        avatar: `https://reqres.in/img/faces/${validUser.role === 'admin' ? 1 : 2}-image.jpg`
      };
      
      // almacenar el usuario en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', validUser.role);
      
      set({ 
        token,
        role: validUser.role,
        user
      });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Invalid credentials');
    }
  },

  // Logout
  logout: () => {
    // Limpiar datos específicos del usuario actual
    usePostsStore.getState().clearUserData();
    usePostsLocalStore.getState().clearUserData();
    useUsersStore.getState().clearUserData();
    
    deleteClientCookie('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    // limpiar el refresh token
    apiRequest('/api/auth/clear-refresh', { method: 'POST' });
    set({ user: null, token: null, role: 'user' });
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await apiRequest('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setClientCookie('accessToken', data.accessToken, { maxAge: 3600 });
        set({ token: data.accessToken });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  // Set user
  setUser: (user: User) => set({ user }),

  // Initialize auth
  initializeAuth: () => {
    const token = getClientCookie('accessToken');
    if (token) {
      // tratar de obtener el usuario de localStorage
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('userRole');
      
      if (storedUser && storedRole) {
        const user = JSON.parse(storedUser);
        set({ 
          token, 
          user,
          role: storedRole as 'admin' | 'user'
        });
      }
    }
  },
}));
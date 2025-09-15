import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UsersState {
  deletedUsers: number[];
  roleChanges: Record<number, 'admin' | 'user' | 'moderator'>;
  markUserAsDeleted: (userId: number) => void;
  isUserDeleted: (userId: number) => boolean;
  changeUserRole: (userId: number, role: 'admin' | 'user' | 'moderator') => void;
  getUserRole: (userId: number) => 'admin' | 'user' | 'moderator' | undefined;
  clearUserData: () => void;
}

// Store de usuarios
export const useUsersStore = create<UsersState>()(
  persist(
    (set, get) => ({
      deletedUsers: [],
      roleChanges: {},
      
      // Marcar un usuario como eliminado
      markUserAsDeleted: (userId: number) => {
        set((state) => ({
          deletedUsers: state.deletedUsers.includes(userId) 
            ? state.deletedUsers 
            : [...state.deletedUsers, userId]
        }));
      },
      
      // Verificar si un usuario está eliminado
      isUserDeleted: (userId: number) => {
        return get().deletedUsers.includes(userId);
      },
      
      // Cambiar el rol de un usuario
      changeUserRole: (userId: number, role: 'admin' | 'user' | 'moderator') => {
        set((state) => ({
          roleChanges: {
            ...state.roleChanges,
            [userId]: role
          }
        }));
      },
      
      // Obtener el rol de un usuario
      getUserRole: (userId: number) => {
        return get().roleChanges[userId];
      },
      
      // Limpiar datos del usuario actual
      clearUserData: () => {
        set({ deletedUsers: [], roleChanges: {} });
        // Limpiar también la persistencia
        localStorage.removeItem('users-storage');
      },
    }),
    {
      name: 'users-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

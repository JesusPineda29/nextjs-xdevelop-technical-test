import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Función para manejar IndexedDB
const createIndexedDBStorage = () => ({
  getItem: async (name: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const request = indexedDB.open('posts-store', 1);
      request.onerror = () => resolve(null);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['favorites'], 'readonly');
        const store = transaction.objectStore('favorites');
        const getRequest = store.get(name);
        getRequest.onsuccess = () => {
          resolve(getRequest.result?.value || null);
        };
        getRequest.onerror = () => resolve(null);
      };
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites');
        }
      };
    });
  },
  setItem: async (name: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      const request = indexedDB.open('posts-store', 1);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['favorites'], 'readwrite');
        const store = transaction.objectStore('favorites');
        store.put({ value }, name);
        transaction.oncomplete = () => resolve();
      };
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites');
        }
      };
    });
  },
  removeItem: async (name: string): Promise<void> => {
    return new Promise((resolve) => {
      const request = indexedDB.open('posts-store', 1);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['favorites'], 'readwrite');
        const store = transaction.objectStore('favorites');
        store.delete(name);
        transaction.oncomplete = () => resolve();
      };
    });
  },
});

interface PostsState {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  clearUserData: () => void;
}

// Store de posts
export const usePostsStore = create<PostsState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      // Añadir un favorito
      addFavorite: (id: number) => {
        const { favorites } = get();
        if (!favorites.includes(id)) {
          set({ favorites: [...favorites, id] });
        }
      },
      
      // Eliminar un favorito
      removeFavorite: (id: number) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(fav => fav !== id) });
      },
      
      // Limpiar datos del usuario actual
      clearUserData: () => {
        set({ favorites: [] });
        // Limpiar también la persistencia de IndexedDB
        createIndexedDBStorage().removeItem('posts-favorites');
      },
    }),
    {
      name: 'posts-favorites',
      // persistencia de los favoritos
      storage: createJSONStorage(() => createIndexedDBStorage()),
    }
  )
);

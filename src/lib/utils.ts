/**
 * Utilidades generales para la aplicación
 * 
 * - Genera IDs únicos para elementos nuevos
 * - Evita duplicados en localStorage
 */

// Generar un ID único para nuevos elementos
export const generateUniqueId = (existingIds: number[] = []): number => {
  let id: number;
  do {
    // Combinar timestamp actual + número aleatorio
    id = Date.now() + Math.floor(Math.random() * 10000);
  } while (existingIds.includes(id)); // Asegurar que no existe
  return id;
};

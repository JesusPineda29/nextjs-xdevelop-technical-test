// Utilidades generales para la aplicación

// Genera un ID único basado en timestamp y número aleatorio
export const generateUniqueId = (existingIds: number[] = []): number => {
  let id: number;
  do {
    id = Date.now() + Math.floor(Math.random() * 10000);
  } while (existingIds.includes(id));
  return id;
};

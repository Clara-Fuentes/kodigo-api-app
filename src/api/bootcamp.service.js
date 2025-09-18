import apiClient from './axios.js';// Importamos nuestro cliente Axios consfigurado

/**
 * Obtiene la lista de todos los bootcamps desde la API.
 * @returns {Promise<Array>} La lista de bootcamps.
 */
export const getAllBootcamps = async () => {
  try {
    // Hacemos la petición GET al endpoint '/bootcamps'
    const response = await apiClient.get('/bootcamps');
    
    // Devolvemos solo la data que nos interesa
    return response.data.data;
  } catch (error) {
    // Si hay un error, lo mostramos en consola y lo lanzamos
    console.error('Error al obtener los bootcamps:', error);
    throw error;
  }
};

/**
 * Obtiene un bootcamp específico por su ID.
 * @param {number} id El ID del bootcamp.
 * @returns {Promise<Object>} El objeto del bootcamp.
 */
export const getBootcampById = async (id) => {
  try {
    const response = await apiClient.get(`/bootcamps/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error al obtener el bootcamp con ID ${id}:`, error);
    throw error;
  }
};

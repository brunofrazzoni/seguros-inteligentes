// src/utils/aiAgent.js

const API_URL = 'http://localhost:5001/api/analyze-profile'; // Endpoint del backend

/**
 * Envía el perfil del usuario al backend para análisis con IA.
 * @param {Object} input - Datos del usuario y su portafolio.
 * @param {Function} [onProgress] - Función opcional para seguimiento del estado.
 * @returns {Promise<Object>} - Respuesta analizada por el asistente de IA.
 */
export const analyzeUserProfile = async (input, onProgress) => {
  try {
    if (onProgress) onProgress('Cargando recomendaciones de IA...');

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data = await response.json();

    if (onProgress) onProgress('Análisis IA recibido');

    return data;
  } catch (error) {
    console.error('Error al obtener análisis IA desde backend:', error);
    throw error;
  }
};
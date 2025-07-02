// src/utils/aiAgent.js

const API_URL = 'http://localhost:5001/api/analyze-profile'; // Endpoint del backend

/**
 * Envía el perfil del usuario al backend para análisis con IA.
 * @param {Object} input - Datos del usuario y su portafolio.
 * @returns {Promise<Object>} - Respuesta analizada por el asistente de IA.
 */
export const analyzeUserProfile = async (input) => {
  try {
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

    return await response.json();
  } catch (error) {
    console.error('Error al obtener análisis IA desde backend:', error);
    throw error;
  }
};
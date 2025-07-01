import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Solo para desarrollo local (React)
});

export const analyzeUserProfile = async (input) => {
  try {
    const thread = await openai.beta.threads.create();

    // Estructura del mensaje enviado al asistente
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `
Eres un asesor de seguros inteligente. Evalúa este perfil de usuario y su portafolio de seguros, detecta brechas de cobertura, sugiere optimizaciones, y entrega insights accionables.

📄 Perfil del usuario:
${JSON.stringify(input.userProfile, null, 2)}

🧾 Portafolio actual:
${JSON.stringify(input.currentPortfolio, null, 2)}

📉 Cambios recientes:
${JSON.stringify(input.profileChanges || {}, null, 2)}

📚 Opciones disponibles:
${JSON.stringify(input.availableInsurance || [], null, 2)}

Tu respuesta debe tener formato JSON como este ejemplo:

{
  "analysis": {
    "portfolioScore": 7,
    "monthlySavings": 12000,
    "coverageGaps": ["salud catastrófica", "seguro dental"]
  },
  "recommendations": [
    {
      "action": "Contratar seguro dental con cobertura de $500.000",
      "reasoning": "Actualmente no tiene cobertura ante eventos frecuentes de salud dental.",
      "priority": "alta"
    }
  ]
}
      `
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: 'asst_eWx5YEufHUklBdL0CN1vpTZX'
    });

    let result;
    while (true) {
      result = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      if (result.status === 'completed') break;
      await new Promise(res => setTimeout(res, 1000));
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data.find(msg => msg.role === 'assistant');

    if (!lastMessage) throw new Error('No se recibió respuesta del asistente.');

    const content = lastMessage.content[0]?.text?.value;
    return JSON.parse(content);

  } catch (error) {
    console.error('Error al obtener análisis IA:', error);
    throw error;
  }
};
import express from 'express';
import { OpenAI } from 'openai';

const router = express.Router();

// ✅ NO crear cliente OpenAI aquí - hacerlo cuando se necesite
let openaiClient = null;

function getOpenAIClient() {
  if (!openaiClient) {
    console.log('🔧 Creando cliente OpenAI...');
    console.log('🔑 API Key disponible:', !!process.env.OPENAI_API_KEY);
    console.log('🤖 Agent ID disponible:', !!process.env.AGENT_ID);
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY no está configurada');
    }
    
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORG
    });
    
    console.log('✅ Cliente OpenAI creado exitosamente');
  }
  
  return openaiClient;
}

router.post('/', async (req, res) => {
  const input = req.body;
  
  console.log('📥 Datos recibidos en análisis IA:', Object.keys(input));

  try {
    // ✅ Crear cliente solo cuando se necesita
    const openai = getOpenAIClient();
    const AGENT_ID = process.env.AGENT_ID;
    
    if (!AGENT_ID) {
      throw new Error('AGENT_ID no está configurada');
    }

    console.log('🤖 Iniciando análisis con Assistant:', AGENT_ID);

    const thread = await openai.beta.threads.create();
    
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: JSON.stringify(input)
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: AGENT_ID
    });

    let status;
    do {
      const result = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      status = result.status;
      if (['failed', 'cancelled', 'expired'].includes(status)) {
        throw new Error(`Run failed: ${status}`);
      }
      await new Promise(r => setTimeout(r, 1500));
    } while (status !== 'completed');

    const messages = await openai.beta.threads.messages.list(thread.id);
    const assistantMessage = messages.data.find(m => m.role === 'assistant');

    if (!assistantMessage) {
      throw new Error('No se recibió respuesta del asistente');
    }

    console.log('✅ Respuesta recibida del Assistant');
    
    res.json(JSON.parse(assistantMessage.content[0].text.value));
    
  } catch (error) {
    console.error('❌ Error analizando perfil IA:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
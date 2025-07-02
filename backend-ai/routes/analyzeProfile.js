const express = require('express');
const { OpenAI } = require('openai');

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
    const openai = getOpenAIClient();
    const AGENT_ID = process.env.AGENT_ID;

    if (!AGENT_ID) {
      throw new Error('AGENT_ID no está configurada');
    }

    console.log('🤖 Iniciando análisis con Assistant:', AGENT_ID);

    const threadResponse = await openai.beta.threads.create();
    const threadId = threadResponse?.id;
    console.log('🧵 threadResponse completo:', JSON.stringify(threadResponse, null, 2));

    if (!threadId || !threadId.startsWith('thread')) {
      throw new Error(`Thread ID inválido o no generado correctamente: ${threadId}`);
    }

    console.log('🧵 Thread creado. ID:', threadId);

    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: JSON.stringify(input)
    });
    console.log('📨 Mensaje enviado al thread');

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: AGENT_ID
    });
    const runId = run.id;
    console.log('🏃‍♂️ run completo:', JSON.stringify(run, null, 2));
    console.log('🏃‍♂️ Run iniciado. ID:', run.id);

    let status;
    do {
      console.log('🧪 Validando IDs antes del retrieve...');
      console.log('📍 threadId:', threadId, 'type:', typeof threadId);
      console.log('📍 runId:', runId, 'type:', typeof runId);

      if (!threadId || !threadId.startsWith('thread')) {
        throw new Error(`threadId inválido justo antes del retrieve: ${threadId}`);
      }
      if (!runId || !runId.startsWith('run')) {
        throw new Error(`runId inválido justo antes del retrieve: ${runId}`);
      }

      console.log('🧪 threadId al hacer retrieve:', threadId, 'typeof:', typeof threadId);
      console.log('🧪 runId al hacer retrieve:', runId, 'typeof:', typeof runId);

      if (!threadId || !threadId.startsWith('thread')) {
        throw new Error(`threadId inválido antes del retrieve: ${threadId}`);
      }
      if (!runId || !runId.startsWith('run')) {
        throw new Error(`runId inválido antes del retrieve: ${runId}`);
      }

      const result = await openai.beta.threads.runs.retrieve(runId, { thread_id: threadId });
      status = result.status;

      if (['failed', 'cancelled', 'expired'].includes(status)) {
        throw new Error(`Run failed: ${status}`);
      }
      await new Promise(r => setTimeout(r, 1500));
    } while (status !== 'completed');

    console.log('🔁 Run completado con status:', status);

    const messages = await openai.beta.threads.messages.list(threadId);
    const assistantMessage = messages.data.find(m => m.role === 'assistant');

    if (!assistantMessage) {
      throw new Error('No se recibió respuesta del asistente');
    }

    console.log('✅ Respuesta recibida del Assistant');
    
    try {
      const parsed = JSON.parse(assistantMessage.content[0].text.value);
      res.json(parsed);
    } catch (jsonError) {
      console.error('⚠️ Error al parsear respuesta del assistant:', jsonError.message);
      res.status(500).json({ error: 'Error al interpretar la respuesta del asistente.' });
    }

  } catch (error) {
    console.error('❌ Error analizando perfil IA:', error.message);
    console.error('🧠 Stack trace:', error.stack);
    console.error('📦 Payload original:', JSON.stringify(req.body, null, 2));
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
import express from 'express';
import { OpenAI } from 'openai';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG
});

const AGENT_ID = process.env.AGENT_ID;

router.post('/', async (req, res) => {
  const input = req.body;

  try {
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

    res.json(JSON.parse(assistantMessage.content[0].text.value));
  } catch (error) {
    console.error('Error analizando perfil IA:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
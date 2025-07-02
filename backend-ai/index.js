const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const analyzeProfileRouter = require('./routes/analyzeProfile');


dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('✅ OPENAI_API_KEY desde .env:', process.env.OPENAI_API_KEY);

// Verificación
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY no encontrada');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/analyze-profile', analyzeProfileRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor IA corriendo en http://localhost:${PORT}`);
});
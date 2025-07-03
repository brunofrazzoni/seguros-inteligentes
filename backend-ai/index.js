const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const analyzeProfileRouter = require('./routes/analyzeProfile');
console.log('📦 analyzeProfileRouter cargado correctamente');
const usersRouter = require('./users');
console.log('📦 usersRouter cargado correctamente');
const userProfileRouter = require('./routes/userProfile');
console.log('📦 userProfileRouter cargado correctamente');

console.log('🔧 Inicializando backend-ai/index.js');

dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('✅ OPENAI_API_KEY desde .env:', process.env.OPENAI_API_KEY);

// Verificación
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY no encontrada');
  process.exit(1);
}

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    // Permite localhost en cualquier IP o sin origin (como curl)
    if (!origin || origin.includes('localhost')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use('/api/analyze-profile', analyzeProfileRouter);
app.use('/api/users', usersRouter);
app.use('/api/profile', usersRouter);
app.use('/api/user-profile', userProfileRouter);

const PORT = process.env.PORT || 5001;
console.log('🚀 Inicializando servidor Express...');
app.listen(PORT, () => {
  console.log(`✅ Servidor IA corriendo en http://localhost:${PORT}`);
});
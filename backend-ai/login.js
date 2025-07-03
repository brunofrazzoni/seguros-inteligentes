const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta: POST /login
router.post('/', (req, res) => {
  const { email, password } = req.body;
  console.log('📩 Login recibido con:', { email, password });

  if (!email || !password) {
    console.warn('⚠️ Falta email o password');
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const usersFilePath = path.join(__dirname, '../data/users.json');
  console.log('📂 Leyendo usuarios desde:', usersFilePath);

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ Error leyendo archivo de usuarios:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.email === email);
    console.log('🔍 Usuario encontrado:', user);

    if (!user || user.password !== password) {
      console.warn('⛔ Credenciales inválidas para:', email);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    console.log('✅ Login exitoso para:', email);
    return res.status(200).json({ message: 'Login exitoso', userId: user.userId });
  });
});

module.exports = router;
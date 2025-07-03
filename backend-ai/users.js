// users.js - Rutas para manejar usuarios (GET y POST)

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Leer todos los usuarios desde el archivo
function readUsers() {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data);
}

// Guardar todos los usuarios en el archivo
function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// GET /api/users — retorna todos los usuarios
router.get('/', (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error reading users file' });
  }
});

// POST /api/users — agrega un nuevo usuario
router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const users = readUsers();
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    users.push({ email, password });
    writeUsers(users);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error writing users file' });
  }
});

// GET /api/users/profile — obtiene el perfil del usuario por email
router.get('/profile', (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Falta el parámetro email' });
  }

  const safeEmail = email.replace(/[^a-zA-Z0-9.@_-]/g, '_');
  const profilePath = path.join(__dirname, 'data', `userProfile_${safeEmail}.json`);
  try {
    if (fs.existsSync(profilePath)) {
      const data = fs.readFileSync(profilePath, 'utf8');
      const profileData = JSON.parse(data);
      return res.json(profileData);
    } else {
      return res.status(200).json({ userProfile: null, currentPortfolio: null, onboardingCompleted: false });
    }
  } catch (error) {
    console.error('Error reading user profile:', error);
    return res.status(500).json({ error: 'Error reading user profile' });
  }
});

module.exports = router;
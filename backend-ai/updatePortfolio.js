const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta: POST /update-portfolio
router.post('/', (req, res) => {
  const { email, userProfile, currentPortfolio, onboardingCompleted } = req.body;

  if (!email || !userProfile || !currentPortfolio) {
    return res.status(400).json({ error: 'Faltan datos requeridos: email, userProfile o currentPortfolio' });
  }

  const filePath = path.join(__dirname, `../data/userProfile_${email}.json`);
  const dataToSave = { userProfile, currentPortfolio, onboardingCompleted };

  fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2), (err) => {
    if (err) {
      console.error('Error al guardar el archivo de usuario:', err);
      return res.status(500).json({ error: 'No se pudo guardar el archivo del usuario' });
    }

    console.log('✅ Perfil y portafolio guardados exitosamente para:', email);
    res.status(200).json({ message: 'Perfil y portafolio actualizados correctamente' });
  });
});

module.exports = router;
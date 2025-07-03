const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/profile', (req, res) => {
  const email = req.query.email;
  if (!email) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: 'Email is required' });
  }

  const usersPath = path.join(__dirname, '../data/users.json');
  if (!fs.existsSync(usersPath)) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({ error: 'Users database not found' });
  }

  const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  const user = usersData.find(u => u.email === email);

  if (user) {
    res.setHeader('Content-Type', 'application/json');
    return res.json({
      userProfile: user.userProfile || null,
      currentPortfolio: user.currentPortfolio || null,
      onboardingCompleted: user.onboardingCompleted || false
    });
  } else {
    res.setHeader('Content-Type', 'application/json');
    return res.json({
      userProfile: null,
      currentPortfolio: null,
      onboardingCompleted: false
    });
  }
});

module.exports = router;
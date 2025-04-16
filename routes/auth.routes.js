const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/test', (req, res) => {
  res.send('Ruta auth funcionando!');
});

module.exports = router;
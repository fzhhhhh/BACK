const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Lógica de registro...
exports.registerUser = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    const [userExists] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (userExists.length > 0) {
      return res.status(400).json({ mensaje: 'Correo ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    await pool.query('INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)', [nombre, correo, hashedPassword]);

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }

};

// Lógica de login...
exports.loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    const usuario = usuarios[0];

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo no encontrado' });
    }

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
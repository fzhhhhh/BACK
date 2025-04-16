const pool = require('../config/db');


// Obtener eventos...
exports.getEvents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM eventos ORDER BY fecha ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
};


// Crear un evento...
exports.createEvent = async (req, res) => {
  const { nombre, descripcion, fecha, lugar, precio } = req.body;

  try {
    await pool.query(
      'INSERT INTO eventos (nombre, descripcion, fecha, lugar, precio) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, fecha, lugar, precio]
    );
    res.status(201).json({ mensaje: 'Evento creado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear evento' });
  }
};
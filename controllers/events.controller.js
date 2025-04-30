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


// Eliminar un evento...
exports.deleteEvent = async (req, res) => {
  const { id } = req.body;

  try {
    const [resultado] = await pool.query('DELETE FROM eventos WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }

    res.json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ error: 'Error al eliminar evento' });
  }
};


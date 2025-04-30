require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
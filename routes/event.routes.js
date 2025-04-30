const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/events.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const {deleteEvent} = require('../controllers/events.controller');

router.get('/', getEvents);
router.post('/', verifyToken, createEvent); // protegida
router.delete('/', deleteEvent);

module.exports = router;
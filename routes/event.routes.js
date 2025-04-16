const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/events.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', getEvents);
router.post('/', verifyToken, createEvent); // protegida

module.exports = router;
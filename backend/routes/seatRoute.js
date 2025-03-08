const express = require('express');
const router = express.Router();
const availableseats = require('../controllers/get_available_seats');
const bookseat = require('../controllers/Book_a_seat');
console.log('Router is loaded');
router.get('/availableseats', availableseats);
router.post('/bookseat', bookseat);
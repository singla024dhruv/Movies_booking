
const express = require('express');
const router = express.Router();
const available = require('../controllers/get_available_seats');
const Cancel=require('../controllers/Cancel_ticket')
const bookseat = require('../controllers/Book_a_seat');
console.log('Router is loaded');
 router.get('/availableseats', available.availableseats);
 router.post("/bookseat", bookseat.bookticket);
// router.post("/cancel", Cancel.cancelTicket);
module.exports=router;


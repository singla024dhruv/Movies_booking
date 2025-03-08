
const express = require('express');
const router = express.Router();
const available = require('../controllers/get_available_seats');
const Cancel=require('../controllers/Cancel_ticket')
const bookseat = require('../controllers/Book_a_seat');
console.log('Router is loaded');
 router.get('/seats', available.availableseats);
 router.post("/bookseat", bookseat.bookticket);
  router.delete("/bookings", Cancel.cancelTicket);
module.exports=router;


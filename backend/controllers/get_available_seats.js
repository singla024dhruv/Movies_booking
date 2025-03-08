const Seat = require('../models/seat.js');
const path = require('path');
module.exports.availableseats = async function (req,res) {
    const seat = await Seat.find();
    
}
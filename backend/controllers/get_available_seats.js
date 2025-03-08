const Seat = require('../models/seat.js');
const BookingDetails = require('../models/booking.js');
const path = require('path');
module.exports.availableseats = async function (req,res) {
    const seat = await Seat.find();
    const bookedSeats = await BookingDetails.find({ status: "Booked" }).select('seat');
    const bookedSeatIds = bookedSeats.map((b) => b.seatId.toString());
    const availableseats = seat.map((seat) => ({
        ...seat,
        isBooked: bookedSeatIds.includes(seat._id.toString())
    }));
    res.json(availableseats);
}
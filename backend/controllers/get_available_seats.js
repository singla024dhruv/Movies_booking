const Seat = require('../models/seat.js');
const BookingDetails = require('../models/booking.js');
const path = require('path');
module.exports.availableseats = async function (req,res) {
    try {
        const seat = await Seat.find();
        const userid = req.body.user;
        console.log(userid);
    const bookedSeats = await BookingDetails.find({ status: "Booked" }).select('seat');
    const bookedSeatIds = bookedSeats.map((b) => b.seatId.toString());
    const availableseats = seat.map((seat) => ({
        ...seat,
        isBooked: bookedSeatIds.includes(seat._id.toString())
    }));
    res.json(availableseats);
     } catch (error) {
        console.error("Error while getting available seats ", error.response);
        res.status(500).json({message:"Internal server error"});
    }
}
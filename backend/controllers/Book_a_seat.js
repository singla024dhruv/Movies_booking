const BookingDetails = require('../models/booking.js');
module.exports.bookticket = async function (req, res) {
    const {seatId} = req.body;
    const alreadybooked = await BookingDetails.findOne({ seatId, status: "Booked" });
    if (alreadybooked) return res.status(400).json({ message: "seat is already booked please select another seat" });
    const booking = new BookingDetails({ seatId, status: "Booked" });
    await booking.save();
    res.json({ message: "Thankyou for Booking ,seat is booked successfully" });
};
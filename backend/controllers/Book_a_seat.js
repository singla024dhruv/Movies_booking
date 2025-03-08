const BookingDetails = require('../models/booking.js');
module.exports.bookticket = async function (req, res) {
    try{ const {seatId} = req.body;
    const alreadybooked = await BookingDetails.findOne({ seatId, status: "booked" });
    if (alreadybooked) return res.status(400).json({ message: "seat is already booked please select another seat" });
    const booking = new BookingDetails({ seatId, status: "Booked" });
    await booking.save();
    res.json({ message: "Thankyou for Booking ,seat is booked successfully" });
     } catch (error) {
        console.error("Error while cancelling: ", error.response);
        res.status(500).json({message:"Internal server error"});
    }
};
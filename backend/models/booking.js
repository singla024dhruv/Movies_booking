const mongoose = require('mongoose');
const UserDetails = require('./user');
const bookingSchema = new mongoose.Schema(
    {
        seat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seat",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserDetails,
        },
        status: {
            type: String,
            default: "not booked",
        }
    }, {
    Timestamp: true,
}
);
const BookingDetails = mongoose.Model('BookingDetails', bookingSchema);
module.exports = BookingDetails;
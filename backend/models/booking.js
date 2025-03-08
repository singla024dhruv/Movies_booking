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
      ref: "UserDetails",
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  {
    Timestamp: true,
  }
);
const BookingDetails = mongoose.model('BookingDetails', bookingSchema);
module.exports = BookingDetails;
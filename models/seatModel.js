// models/Seat.js
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatId: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 50
  },
  type: {
    type: String,
    enum: ['regular', 'vip'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  bookedBy: {
    type: String,
    default: null
  },
  bookingTime: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Create index for faster queries
seatSchema.index({ seatId: 1 });
seatSchema.index({ isBooked: 1 });
seatSchema.index({ type: 1 });

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
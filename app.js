const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Seat = require('./models/seatModel');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Initialize seats if database is empty
const initializeSeats = async () => {
  try {
    const count = await Seat.countDocuments();
    if (count === 0) {
      console.log('Initializing seats...');
      const seats = Array.from({ length: 50 }, (_, i) => ({
        seatId: i + 1,
        type: i < 10 ? 'vip' : 'regular',
        price: i < 10 ? 20 : 10,
        isBooked: false
      }));
      await Seat.insertMany(seats);
      console.log('Seats initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing seats:', error);
  }
};

// Routes
app.get('/api/seats', async (req, res) => {
  try {
    const seats = await Seat.find().sort({ seatId: 1 });
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seats' });
  }
});

app.get('/api/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findOne({ seatId: parseInt(req.params.id) });
    if (!seat) return res.status(404).json({ error: 'Seat not found' });
    res.status(200).json(seat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seat' });
  }
});

app.post('/api/bookings', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log("Rohan");
  console.log(req.body);
  try {
    const { seatId, name } = req.body;
    if (!seatId || !name) throw new Error('Seat ID and customer name are required');

    const seat = await Seat.findOne({ seatId }).session(session);
    if (!seat || seat.isBooked) throw new Error('Seat is not available');

    seat.isBooked = true;
    seat.bookedBy = name;
    seat.bookingTime = new Date();
    await seat.save({ session });

    await session.commitTransaction();
    res.status(201).json({ message: 'Seat booked successfully', seat });
  } catch (error) {
    await session.abortTransaction();
    console.log(error)
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const seat = await Seat.findOne({ seatId: parseInt(req.params.id) });
    if (!seat || !seat.isBooked) throw new Error('Seat is not booked');

    seat.isBooked = false;
    seat.bookedBy = null;
    seat.bookingTime = null;
    await seat.save();

    res.status(200).json({ message: 'Booking cancelled successfully', seat });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Analytics endpoint
app.get('/api/analytics', async (req, res) => {
  try {
    const seats = await Seat.find();
    const totalSeats = seats.length;
    const bookedSeats = seats.filter(seat => seat.isBooked).length;
    const revenue = seats.reduce((acc, seat) => acc + (seat.isBooked ? seat.price : 0), 0);
    
    res.status(200).json({
      totalSeats,
      bookedSeats,
      availableSeats: totalSeats - bookedSeats,
      occupancyRate: ((bookedSeats / totalSeats) * 100).toFixed(2) + '%',
      revenue
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate analytics' });
  }
});

// Start the server
const startServer = async () => {
  await initializeSeats();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();

module.exports = app;

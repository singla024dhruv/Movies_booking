const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Seat = require("./models/Seat");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedSeats = async () => {
    try {
        await Seat.deleteMany({}); 

        const seats = Array.from({ length: 50 }, (_, i) => ({
            seat_number: i + 1,
            category: i < 10 ? "VIP" : "Regular", 
            price: i < 10 ? 500 : 200,
        }));

        await Seat.insertMany(seats);
        console.log("50 seats added to database!");
        mongoose.disconnect();
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

seedSeats();

const Booking=require('../models/seat');

const cancelTicket=async(req, res)=>{
    try {
        const {seat_number}=req.body;
        const response=await Booking.findOne({seat_number, status:"Booked"});
        if(!response) return res.status(400).json({message:"Not booked yet"})
        response.status="available";
        await response.save();
        res.json({message:"Cancelled successfully"});
    } catch (error) {
        console.error("Error while cancelling: ", error.response);
        res.status(500).json({message:"Internal server error"});
    }
};

module.exports= cancelTicket;
const mongoose=require("mongoose");

const seatSchema=new mongoose.Schema({
    seat_number:{
        type:Number,
        required:true,
        unique: true,
        
    },
    status:{
        type:String,
        enum:["available", "booked"],
        default:"available"
    },
    category:{
        type:String,
        enum:["VIP", "Regular"],
        default:"Regular"
    },
    price:{
        type:Number,
        required:true
    }
});

const Seat= mongoose.model("Seat", seatSchema);
module.exports=Seat;
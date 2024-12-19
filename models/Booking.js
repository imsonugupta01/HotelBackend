const mongoose=require("mongoose")
const BookingSchema= new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },
    BookedData:{
        type:Date,
        required:true
    },
    TourId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    Person:[
      {
        name:{
            type:String,
            required:true,
        },
        gender:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true,
         
        }

      }
    ],
    rate:{
        type:Number,
        required:true,
    }
})
const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
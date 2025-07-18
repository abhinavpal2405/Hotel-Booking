


import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";



// function to check available

const checkAvailability = async ({ checkInDate, checkOutDate, room})=>{
    try {
        const bookings= await Booking.find({
            room,
            checkInDate: {$lte: checkOutDate},
            checkOutDate: {$gte: checkInDate},
        });
         const isAvailable= bookings.length ===0;
         return isAvailable;
    } catch (error) {
        console.error(error.message);
    }
}


// api to check availability 
//POST /api/bookings/check-availability
 export const checkAvailabilityAPI = async (req, res)=>{
    try {
        const {room, checkInDate, checkOutDate}= req.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        res.json({success: true, isAvailable})
    } catch (error) {
        res.json({success: false, isAvailable})
    }
 }


 // api to create a new booking
 // POST /api/bookings/book

 export const createBooking = async (req, res)=>{
    try {
        const {room, checkInDate, checkOutDate, guests}= req.body;
        const user= req.user._id;

        // before booking chech available
         const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room,
         });
         if(!isAvailable){
            return res.json({success:false, message: "Room is not available"})
         }
         //get total price for room

         const roomData = await Room.findById(room).populate("hotel");
         let totalPrice = roomData.pricePerNight;
         // based on night
          const checkIn = new Date(checkInDate);
          const checOut = new Date(checkOutDate);
          const timeDiff =  checkOutDate.getTime() - checkIn.getTime();
          const nights= Math.ceil(timeDiff / (1000*3600*24));

          totalPrice *= nights;

          const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
          })
          res.json({success: true, message:"Message created Successfully"});
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message:" Failed to create booking"})
        
    }

 };

 // api to get all bboking for a user
 // get /api/bookings/user

 export const getUserBookings = async(req,res)=>{
    try {
        const user= req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt: -1})
        res.json({success:true, bookings})
    } catch (error) {
        res.json({success: false,message: "Failed to fetch bookings"});
    }
 }

 export const getHotelBookings = async (req,res)=>{
    try {
        const hotel = await Hotel.findOne({owner: req.auth.userId});
    if(!hotel){
        return res.json({success: false, message: "No Hotel found"});
    }
    const bookings= await Booking.find({hotel: hotel._id}).populate("room hotel user").sort({createdAt:-1});
    //Total  Booking
    const  totalBookings= bookings.length;
    //total revenue
    const totalRevenue = bookings.reduce((acc,booking)=> + booking.totalPrice,0)

    res.json({success: true, dashboardData: {totalBookings, totalRevenue, bookings}})
    } catch (error) {
        res.json({success: false, message:"Failed to fetch bookings"})
    }
 }
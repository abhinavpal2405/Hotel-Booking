import Hotel from "../models/Hotel.js";
import { v2 as cloudinary} from "cloudinary";
import Room from "../models/Room.js";

// api to create new room for hotel

export const createRooms = async (req, res)=>{
    try {
        const{roomType, pricePerNight, amenities}=req.body
        const hotel= await Hotel.findOne({owner: req.auth.userId})

        if(!hotel) return res.json({success: false, message: "No Hotel Found"});

        // upload image to cloudinary
        const uploadImages = req.files.map(async(file)=>{
          const response =  await cloudinary.uploader.upload(file.path);
          return response.secure_url;
        })
       const images= await Promise.all(uploadImages)
       await Room.create({
        hotel:hotel._id,
        roomType,
        pricePerNight: +pricePerNight,
        amenities: JSON.parse(amenities),
        images,
       })
       res.json({success: true, message: "Room created successfully"})
    } catch (error) {
        res.json({success: false, message: error.message})

        
    }

}


// api to get all room 
export const  getRooms= async(req, res)=>{
    try {
      const room=   await Room.find({isAvailable:true}).populate({
        path: 'hotel',
        populate:{
            path: 'owner',
            select: 'image'
        }
      }).sort({createdAt: -1})
      res.json({success: true, rooms});
        
    } catch (error) {
        res.json({success: false, message: error.message});
        
    }

}

//  api to specific hotel
export const  getOwnerRooms= async(req, res)=>{
    try {
        const hotelData = await Hotel({owner: req.auth.userId})
        const rooms =await Room.find({hotel: hotelData._id.toString()}).populate("hotel");
        res.json({success: true, rooms});
    } catch (error) {
        res.json({success: false, message: error.message});
    }

}

// toggle availabality

export const  toggleRoomAvailability= async(req, res)=>{
    try {
        const {roomId}= req.body;
        const roomData= await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success: true, message: "Room availability Updated"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }


}
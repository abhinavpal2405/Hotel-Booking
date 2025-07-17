import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { createRooms, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/RoomController.js";

 const roomRouter = express.Router();

 roomRouter.post('/',upload.array("images",4),protect,createRooms)
  roomRouter.get('/', getRooms)
  roomRouter.get('/owner', protect,getOwnerRooms)
  roomRouter.post('/toggle-availability', protect,toggleRoomAvailability)

 export default roomRouter;

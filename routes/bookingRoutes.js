const express=require("express");
const { BookTour, GetUserBooking, GetHistoryById } = require("../controllers/bookingControllers");
const authenticate = require("../middlewares/authenticate");

const router=express.Router();

router.post("/book",BookTour)
router.get("/UserBooking/:userId",GetUserBooking)
router.get("/getById/:id",GetHistoryById)

module.exports=router;
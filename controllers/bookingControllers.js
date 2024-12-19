const Booking = require("../models/Booking");

exports.BookTour = async (req, res) => {
  try {
    // Extract booking details from the request body
    const { userId, bookedDate, tourId,image, person, rate } = req.body;

    // Validate required fields
    if (!userId || !bookedDate || !tourId || !image || !person || !rate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate the person array
    if (!Array.isArray(person) || person.length === 0) {
      return res.status(400).json({ message: "At least one person is required." });
    }

    // Create a new booking
    const newBooking = new Booking({
      userId,
      BookedData: new Date(bookedDate),
      TourId: tourId,
      image,
      Person: person,
      rate,
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Respond with success message and booking details
    return res.status(201).json({
      message: "Tour booked successfully!",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error booking tour:", error);
    return res.status(500).json({ message: "An error occurred while booking the tour." });
  }
};


exports.GetUserBooking=async(req,res)=>{
    try {
        const{userId}=req.params;
        const History = await Booking.find({ userId: userId });
        if(!History)
        {
            return res.status(404).json({ message: 'Booking History not found' });
        }
        res.status(200).json(History);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tour detail' });
        
    }

}
exports.GetHistoryById=async(req,res)=>{
  try {
      const{id}=req.params;
      const History = await Booking.findById(id );
      if(!History)
      {
          return res.status(404).json({ message: 'Booking History not found' });
      }
      res.status(200).json(History);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving tour detail' });
      
  }

}
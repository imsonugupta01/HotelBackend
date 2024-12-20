const Review =require("../models/Review")

exports.AddReview=async (req,res)=>{
    const { userId,tourId, rating, reviewText } = req.body;

    
    if (!tourId || !userId || !rating || !reviewText) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      // Create the review
      const newReview = new Review({
        tourId,
        userId,
        rating,
        reviewText,
        // reviewDate is automatically set to today's date without time
      });
  
      await newReview.save();
  
      res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllReview=async(req,res)=>{
    try {
        const review=await Review.find()
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving review' });
        
    }
}
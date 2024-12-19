const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour', // Reference to the Tour model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Rating between 1 and 5
    },
    reviewText: {
      type: String,
      required: true,
      minlength: 10, // Minimum 10 characters for the review text
      maxlength: 500, // Maximum 500 characters for the review text
    },
    reviewDate: {
      type: Date,
      default: () => {
        const today = new Date();
        // Only store the date in YYYY-MM-DD format (without the time)
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
      },
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

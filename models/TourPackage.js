const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableDates: [{
    type: Date,
    required: true,
  }],
  imageUrl: {
    type: String, // URL of the image stored in Firebase Storage
    required: true,
  },
});

const TourPackage = mongoose.model('TourPackage', tourPackageSchema);
module.exports = TourPackage;

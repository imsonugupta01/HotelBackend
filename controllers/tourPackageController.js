const multer = require("multer");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const TourPackage = require("../models/TourPackage");
const { storage } = require("../firebase/firebaseConfig");
const path = require("path");

// Multer configuration
const storageConfig = multer.memoryStorage(); // Store files in memory as buffers
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/; // Supported file types
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif) are allowed")); // Reject the file
  }
};

const upload = multer({
  storage: storageConfig,
  fileFilter: fileFilter,
});

// Controller to handle adding tour package
exports.AdddTourPackage = [
  upload.single("image"), // Expecting 'image' as the form-data field
  async (req, res) => {
    try {
      const { title, description, price, availableDates } = req.body;
      const file = req.file; // Multer processes the file and makes it available as `req.file`

      if (!file) {
        return res.status(400).json({ message: "Image file is required" });
      }

      // Create a storage reference in Firebase Storage
      const storageRef = ref(storage, `tour-packages/${Date.now()}_${file.originalname}`);

      // Upload the image file to Firebase Storage
      await uploadBytes(storageRef, file.buffer);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Save tour package details to MongoDB
      const newPackage = new TourPackage({
        title,
        description,
        price,
        availableDates: availableDates.split(","), // Convert comma-separated string to an array
        imageUrl, // Store the URL of the image uploaded to Firebase
      });

      // Save the new tour package in the database
      await newPackage.save();

      res.status(201).json({
        message: "Tour package created successfully",
        tourPackage: newPackage,
      });
    } catch (error) {
      console.error("Error creating tour package:", error);
      res.status(500).json({ message: "Server error", error });
    }
  },
];



exports.findTours=async(req,res)=>{
    try {
        const tours=await TourPackage.find();
          res.status(200).json(tours);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tours data' });
    }
}



exports.GetTourDetail = async (req, res) => {
  try {
      // Extract the tour name from the request parameters or query string
      const { title } = req.params;

      // Find the tour by its name
      const tourDetail = await TourPackage.findOne({ title: title });

      if (!tourDetail) {
          return res.status(404).json({ message: 'Tour package not found' });
      }

      res.status(200).json(tourDetail);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving tour detail' });
  }
};


// exports.findTourDetail=async=(req,res)=>{
//   try {
//     const tourDetail=await TourPackage.find();
//   } catch (error) {
    
//   }
// }
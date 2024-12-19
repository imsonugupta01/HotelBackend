const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const tourRoutes=require('./routes/tourRoutes')
const bookingRoutes=require('./routes/bookingRoutes')

// const addTourPackages =require("./routes/addTourPackages")
// const { addTourPackage } = require('./controllers/tourPackageController');

// Load environment variables
const reviewRoutes=require('./routes/reviewRoutes')
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Auth-related routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/tour-packages',tourRoutes);
app.use('/api/bookTour',bookingRoutes);
app.use('/api/review',reviewRoutes)


// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

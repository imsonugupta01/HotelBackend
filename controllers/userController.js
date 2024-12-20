const User = require('../models/User');

// Get User Logic
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: { name: user.name, email: user.email,id:user.id } });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user data' });
  }
};


// Post request to get user by userId (Recommended)
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query parameter

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found', userId });
    }

    res.status(200).json({ user: { name: user.name, email: user.email, id: user.id } });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
};



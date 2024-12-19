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

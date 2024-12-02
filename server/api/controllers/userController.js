import User from '../models/User.js';

// Get all users
const getUsers = async (req, res) => {
  console.log('Fetching users...');
  try {
    const users = await User.find().select('-password');
    console.log('Users found:', users);
    res.json(users);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber
    };

    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, dateOfBirth, address, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      address,
      role
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, email, phoneNumber, dateOfBirth, address, role } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.address = address || user.address;
    user.role = role || user.role;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      dateOfBirth: updatedUser.dateOfBirth,
      address: updatedUser.address,
      role: updatedUser.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getUsers, getUser, createUser, updateUser, deleteUser };

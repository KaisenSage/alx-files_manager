const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) return res.status(404).json({ message: 'User not found!' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials!' });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) return res.status(404).json({ message: 'User not found!' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = AuthController;


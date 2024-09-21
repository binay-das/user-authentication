const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    if (user) {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 3600});
        
        res.json({ 
            message: 'User registered successfully', 
            name: name,
            email: email,
            genretedToken: token 
        });
    } else {
        res.status(500).json({ message: 'Server error' });
    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Incorrect username or password!' });
    }

    const isPasswordCorrrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrrect) {
        return res.status(401).json({ message: 'Incorrect username or password!' });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 3600});

    res.json({
        message: `Login successful for ${user.name}`,
        name: user.name,
        email: user.email,
        genretedToken: token
    });
}


module.exports = { signUp, logIn };
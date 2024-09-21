const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const connectToDB = require('./connect');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');

app.use(express.json());

connectToDB()
    .then(() => console.log('Connect to database'))
    .catch((err) => console.log(err));



app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/login', (req, res) => {
    res.json({ message: 'Login successful' });
});

app.get('/api/signup', (req, res) => {
    res.json({ message: 'Signup successful' });
});

app.post('/api', async (req, res) => {
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
            password: password,
            genretedToken: token 
        });
    } else {
        res.status(500).json({ message: 'Server error' });
    }

})

app.post('/api/login', async (req, res) =>  {
    const { email, password } = req.body;
    if (!email ||!password) {
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

});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
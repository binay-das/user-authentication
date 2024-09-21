const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const connectToDB = require('./connect');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,  
    }
));

app.use(cookieParser());

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

app.use('/api', authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
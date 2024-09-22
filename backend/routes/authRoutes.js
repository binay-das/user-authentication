const express = require('express');
const router = express.Router();
const { signUp, logIn, logOut } = require('../controllers/authControllers');
const verifyToken = require('../middlewares/verifyToken');

router.get('/login', (req, res) => {
    res.json({ message: 'Login successful' });
})

router.get('/signup', (req, res) => {
    res.json({ message: 'Signup successful' });
})

router.post('/', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);

router.get('/protected', verifyToken, (req, res) => {
    res.json({ protectedRoute: "This is a protected route" });
});

module.exports = router;
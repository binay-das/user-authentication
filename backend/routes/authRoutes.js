const express = require('express');
const router = express.Router();
const {signUp, logIn} = require('../controllers/authControllers');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', signUp);
router.post('/login', logIn);

router.get('/protected', verifyToken, (req, res) => {
    res.json({protectedRoute: "This is a protected route"});
});

module.exports = router;
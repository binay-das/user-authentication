const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    
    // for photo upload
    // files: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'File'  // reference to the File model
    // }],


}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
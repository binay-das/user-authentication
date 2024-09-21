const mongoose = require('mongoose');

let connectToDB = async () => {
    await mongoose.connect('mongodb://localhost/userAuth');
}

module.exports = connectToDB;
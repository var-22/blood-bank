const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    bloodGroup: String,
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;

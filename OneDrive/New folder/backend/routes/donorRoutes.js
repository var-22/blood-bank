const express = require('express');
const Donor = require('../models/donorModel');
const router = express.Router();

router.get('/donors', async (req, res) => {
    const donors = await Donor.find();
    res.json(donors);
});

router.post('/donors', async (req, res) => {
    const newDonor = new Donor(req.body);
    await newDonor.save();
    res.json(newDonor);
});

router.post('/sos', (req, res) => {
    // Implement the logic to notify all donors (e.g., send SMS or email)
    res.json({ message: 'SOS sent to all donors' });
});

router.get('/search', async (req, res) => {
    const { bloodGroup } = req.query;
    const donors = await Donor.find({ bloodGroup });
    res.json(donors);
});

module.exports = router;

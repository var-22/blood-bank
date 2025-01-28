// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const twilio = require('twilio');

const app = express();

const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blood_donors', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const donorSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    bloodGroup: String
});

const Donor = mongoose.model('Donor', donorSchema);

app.post('/donors', (req, res) => {
    const donor = new Donor(req.body);
    donor.save().then(() => {
        res.status(201).send('Donor registered successfully!');
    }).catch((error) => {
        res.status(400).send(error.message);
    });
});

app.get('/donors', (req, res) => {
    const bloodGroup = req.query.bloodGroup;
    Donor.find({ bloodGroup: bloodGroup }).then((results) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).send(error.message);
    });
});

app.post('/sos', (req, res) => {
    Donor.find().then((donors) => {
        donors.forEach(donor => {
            client.messages.create({
                body: 'Emergency! Blood donation needed.',
                to: donor.phone,
                from: 'your_twilio_phone_number'
            }).then((message) => console.log(message.sid))
              .catch((error) => console.error('Error sending message:', error));
        });
        res.send('SOS notification sent to all registered donors!');
    }).catch((error) => {
        res.status(500).send(error.message);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


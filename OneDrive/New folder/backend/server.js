const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const donorRoutes = require('./routes/donorRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/blooddonor');

app.use('/', donorRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');

const app = express();


const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {

    res.send('Welcome to plasticine');

});


app.use('/api/users', users);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
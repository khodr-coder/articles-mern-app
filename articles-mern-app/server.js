
/*
    Ive opted out of using cors for this application, although this app can be
    easily changed to handle cross-domain requests
*/

//set up express
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors'); 
const router = require('./routes/index');

const app = express();
const PORT = 3001;
const MONGODB_URI = "mongodb://localhost:27017/ArticlesDB";

// app.use(cors())

// middleware for parsing requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Apply the Express router object to the Express app. 
app.use('/api', router);

mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
});
mongoose.connection.once('open', function () {
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', function (error) {
    console.log('Mongoose Connection Error : ' + error);
});

app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}.`);
});
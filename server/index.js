const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// const userRoute = require('./routes/user');
const userRoute = require('./routes/user');
const questionRoute = require('./routes/question')

require('dotenv/config');

const app = express();
// connect hier met ander localhost
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.static('questionScreenshots'));
app.use('./questionScreenshots', express.static('questionScreenshots'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(questionRoute);
app.use(userRoute);

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'CodeQuest',
}).then(() => console.log("Connected to CodeQuest DB"))
    .catch((err) => {
        console.log("No Connection. Reason: " + err);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`) });
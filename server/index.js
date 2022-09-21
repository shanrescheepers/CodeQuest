const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// const userRoute = require('./routes/user');

require('dotenv/config');

const app = express();
// connect hier met ander localhost
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(productRoute);
// app.use(artistRoute);
// app.use(userRoute);
// app.use(ordersRoute);

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
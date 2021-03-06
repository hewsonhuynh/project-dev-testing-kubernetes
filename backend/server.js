const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const app = require('express')();
const moment = require('moment');
const express = require('express');
const Todo = require('./models/Todo');

const FrontRouter = require('./routes/front');

app.set("view engine", "ejs");

app.use(bodyParse.urlencoded({
    extended: true
}));

app.locals.moment = moment;

var monngoURL = 'mongodb://database-service/database';

const db = require('./config/keys').mongoProdURI;
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => { console.log("connected to mongo");})
    .catch((error) => { console.log("unable to connect to mongoDB")
    });

app.get('/api', (req, res) => {
    res.send({
        "data": "hello world!"
    })
});

app.use(FrontRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

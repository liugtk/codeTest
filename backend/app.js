const express = require('express');
const mongoose = require('mongoose');
const APIError = require("./utils/error/apiError")


const Routes = require("./routes/routes");



// set up
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/garage", { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();


// basic express config
app.use(express.json());

// return 200 for root url for network status check
app.get('/', function (req, res) {
    res.status(200).send();
});

Routes(app);


app.use((err, req, res, next) => {
    if (err instanceof APIError) {
        res.status(err.errorCode).json({
            message: err.message
        })
    }
    else {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = app;

const mongoose = require('mongoose');
const config = require('./config');
const url = config.mongodb_uri;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => {

        console.log('Connection established');

    })

    .catch((err) => {
        console.error(err);
    })

module.exports = mongoose
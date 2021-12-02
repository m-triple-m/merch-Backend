const mongoose = require('../connection')

const Schema =new mongoose.Schema({
    name : String,
    username : String,
    password : String,
    email : String
})

const model= mongoose.model('Users',Schema);


module.exports = model;
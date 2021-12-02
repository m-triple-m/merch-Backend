const mongoose = require('../connection')

const Schema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
  created: Date,
  data: Object
})

const model = mongoose.model('orders', Schema);


module.exports = model;
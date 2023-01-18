const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  session: { type: String, unique: true, required: true },
  expirationTime: Number,
}, { collection: 'sessions' })

module.exports = new mongoose.model('Session', sessionSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, minLength: 5, unique: true, required: true },
  address: {
    city: String,
    street: String,
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
  },
  followed: [Number],
  password: String,
}, { collection: "usersInfo" });


module.exports = new mongoose.model('UserInfo', userSchema);
// models/Dealer.js
const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema({
  facilityName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
});

const Dealer = mongoose.model("Dealer", dealerSchema);

module.exports = Dealer;

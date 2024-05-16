// models/Pickup.js
const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userAddress: {
    type: String,
    required: true,
  },
  itemsList: {
    type: Array,
    required: true,
  },
  dealerUserName: {
    type: String,
    required: true,
  },
  status:{
    type: Number,
    required: true,
  }
});

const Pickup = mongoose.model("Pickup", pickupSchema);

module.exports = Pickup;

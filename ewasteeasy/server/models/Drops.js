// models/Drop.js
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const dropSchema = new mongoose.Schema({
  userName: {
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

const Drop = mongoose.model("Drop", dropSchema);

module.exports = Drop;

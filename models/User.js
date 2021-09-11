const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  Bas:{
    type:Number
  }, 
  LTA:{
    type:Number
  },
  HRA:{
    type:Number
  },
  FA:{
    type:Number
  },
  Inv:{
    type:Number
  },
  Rent:{
    type:Number
  },
  CityType:{
    type:String,
    default:'metro', // 0  is for metro city , 1 is for non-metro city
    enum:['metro','non-metro']
  },
  Med:{
    type:Number
  },
  AppHRA:{
    type:Number
  },
  TaxInc:{
    type:Number
  }
});

module.exports = User = mongoose.model("users", UserSchema);

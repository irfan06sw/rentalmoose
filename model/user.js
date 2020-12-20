var mongoose = require('mongoose');
// import mongoose from 'mongoose';
const { Schema } = mongoose;

var user = new Schema({
    username: { type: String },
    password: { type: String },
  
});




mongoose.model('user', user);
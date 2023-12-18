const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,   
    },
    bio:{
        type: String, 
    },
    prn:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer", // Reference the Answer model
      }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question", // Reference the Question model
      }],
  });

  module.exports = mongoose.model('User', UserSchema);
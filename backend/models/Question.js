const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  questionName: {
    type: String,
    required: true,
  },
  questionUrl: {
    type: String,
  },
  tag: {
    type: String,
    default: "General",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
},
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer", // Reference the Answer model
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", QuestionSchema); // Changed the model name to "Question"



// const QuestionSchema = new mongoose.Schema({
//     questionName: String,
//     questionUrl: String,
//     createdAt: {
//       type: Date,
//       default: Date.now, 
//     },
//     answers: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Answer", // Corrected the reference name to singular "Answer"
//     }],
  
//     tags: [String],
//   });

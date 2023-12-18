const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question", 
    },
    answer: {
        type: String,
        required: true
    },
    answerUrl: {
        type: String,
       
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Answer', AnswerSchema);

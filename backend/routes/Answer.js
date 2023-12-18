const express = require("express");
const router = express.Router();
const mongoose = require("mongoose"); // Don't forget to import mongoose



const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userimgUrl: {
    type: String,
  },
    username: {
    type: String,
  },
    userbio: {
    type: String,
  },
  answer: {
    type: String,
    required: true,
  },
  answerUrl: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Answer = mongoose.model("Answer", AnswerSchema);

// Define a POST route to add new answers

router.route("/").get(async (req, res) => {
  try {
    const aggregatedAnswers = await Answer.aggregate([
      {
        $project: {
          _id: 0, // Exclude the '_id' field from the result
          answer: 1, // Include the 'answer' field
          answerUrl: 1, // Include the 'answerUrl' field
          userId: 1, // Include the 'userId' field
          questionId: 1, // Include the 'questionId' field
          userimgUrl: 1,
          username: 1,
          userbio: 1,
        },
      },
    ]);

    res.status(200).send(aggregatedAnswers);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "An error occurred",
    });
  }
});

router.post("/", (req, res) => {
  const newAnswer = new Answer({
    answer: req.body.answer,
    questionId: req.body.questionId,
    userId: req.body.userId,
    userimgUrl: req.body.userimgUrl,
    username: req.body.username,
    userbio: req.body.userbio,
  });

  newAnswer
    .save()
    .then((savedAnswer) => {
      console.log(savedAnswer);
      res.send(savedAnswer);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});



router.put('/:id', async (req, res) => {
  const { answer} = req.body;

  const newAnswer = {};
  if (answer) {
    newAnswer.answer = answer;
  }
  try {
    let answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({ error: 'Answer not found' });
    }

    // Update the question with new data
    answer.set(newAnswer);
    answer = await answer.save();

    res.json({answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;

// router.post(
//   "/",
//   [
//     body("answer", "Answer content is required").notEmpty(),
//     body("answerUrl", "Answer URL is required").notEmpty(),
//     body("questionId", "Question ID is required").notEmpty(), // Make sure you're validating the questionId
//   ],
//   async (req, res) => {
//     try {
//       const { answer, answerUrl, questionId } = req.body;

//       // If there are errors, return Bad request and the errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const newAnswer = new answers({
//         answer,
//         answerUrl,
//         questionId,
//       });

//       const savedAnswer = await newAnswer.save();

//       //Update the corresponding question's answers array
//       await questions.updateOne(
//         { _id: questionId },
//         { $push: { answers: savedAnswer._id } } // Add the new answer's ObjectId to the answers array
//       );

//       res.json(savedAnswer);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

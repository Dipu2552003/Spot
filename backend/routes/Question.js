
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const QuestionSchema = new mongoose.Schema({
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
  tags: [
    {
      type: String,
      default: "",
    },
  ],
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
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer", // Reference the Answer model
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});






const Question = mongoose.model("Question", QuestionSchema);



router.get("/tag/:tagWord", async (req, res) => {
  try {
    const tagWord = req.params.tagWord;

    const aggregatedQuestions = await Question.aggregate([
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "questionId",
          as: "answers",
        },
      },
      {
        $match: {
          tags: tagWord // Match questions with the specified tag
        }
      }
    ]);

    res.status(200).send(aggregatedQuestions);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "An error occurred",
    });
  }
});


// Define routes
router.route("/")
.get(async (req, res) => {
  try {
    const aggregatedQuestions = await Question.aggregate([
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "questionId",
          as: "answers",
        },
      },
    
    ]);

    res.status(200).send(aggregatedQuestions);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "An error occurred",
    });
  }
})

  .post((req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);

    const newQuestion = new Question({
      questionName: req.body.questionName,
      questionUrl: req.body.questionUrl,
      tags: req.body.tags,
      userId:req.body.userId,
      userimgUrl:req.body.userimgUrl,
      username:req.body.username,
      userbio:req.body.userbio,
    });

    newQuestion
      .save()
      .then((savedQuestion) => {
        console.log(savedQuestion);
        res.send(savedQuestion);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

  router.put('/:id', async (req, res) => {
    const { questionName, questionUrl, tags } = req.body;
  
    const newQuestion = {};
    if (questionName) {
      newQuestion.questionName = questionName;
    }
    if (questionUrl) {
      newQuestion.questionUrl = questionUrl;
    }
    if (tags) {
      newQuestion.tags = tags;
    }
  
    try {
      let question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      // Update the question with new data
      question.set(newQuestion);
      question = await question.save();
  
      res.json({ question });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
  
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      // Delete the question
      await question.remove();
  
      res.json({ message: 'Question deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
 
 
module.exports = router;






// const express = require("express");
// const router = express.Router();
// const fetchuser = require("../middleware/fetchuser");

// const { body, validationResult } = require("express-validator");

// //model name quiestions
// const Questions = require("../models/Question");



// //for all Questions in db http://localhost:5000/api/api/question/
// router.get("/", async (req, res) => {
//   try {
//     const allquestions = await Questions.find();
//     res.json(allquestions);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });



// // Route to fetch all questions for the authenticated user
// router.get("/fetchallquestions", fetchuser, async (req, res) => {
//   try {
//     // Fetch all questions belonging to the authenticated user
//     const questions = await Questions.find({ user: req.user.id });

//     res.json(questions);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });


// //Routes 2: add a new question using "http://localhost:5000/api/routes/question"
// router.post(
//   "/postquestion",
//   fetchuser,
//   [
//     body("questionName", "Enter a valid question").isLength({ min: 3 }),
//     body("tag", "Enter a valid tag").isLength({ min: 3 }),
//     body("questionUrl", "Enter a valid URL").isURL(),
//   ],
//   async (req, res) => {
//     try {
//       const { questionName, tag, questionUrl } = req.body;

//       // If there are errors, return Bad request and the errors
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const question = new Questions({
//         questionName,
//         tag,
//         questionUrl,
//         user: req.user.id,
//       });

//       const savedQuestion = await question.save();

//       res.json(savedQuestion);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );


// //simple
// router.post(
//   "/",
//   [
//     body("questionName", "Enter a valid question").isLength({ min: 3 }),
//     body("tag", "Enter a valid tag").isLength({ min: 3 }),
//     body("questionUrl", "Enter a valid URL").isURL(),
//   ],
//   async (req, res) => {
//     console.log(req.body.questionName); // Corrected to questionName
//     console.log(req.body.questionUrl); 

//     const newQuestion = new Questions({
//       questionName: req.body.questionName,
//       questionId: req.body.questionId,
//       tags: req.body.selectedTags,
      
//     });

//     newQuestion
//       .save()
//       .then((savedQuestion) => {
//         console.log(savedQuestion);
//         res.send(savedQuestion);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.send(err);
//       });
//   }
// );



// module.exports = router;




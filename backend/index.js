const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose

connectToMongo();
const app = express()
const port = 5000

app.use(express.json())

app.use(cors());

mongoose.set('strictQuery', false);

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/question', require('./routes/Question'))
app.use('/api/answer',require('./routes/Answer'))

app.get('/',(req,res)=>{
  res.send("Hello");
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
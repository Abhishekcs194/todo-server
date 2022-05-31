const express = require("express");
const mongoose = require("mongoose");

// Will check for .env files and include all values from that file
require("dotenv/config")
const MONGODB_URL = process.env.MONDODB_URL
const PORT = process.env.PORT;


mongoose.connect(MONGODB_URL, {
  // Mongodb connection config
});

mongoose.connection.on("open", () => {
  console.log("Connected to db")
})

mongoose.connection.on("close", () => {
  console.log("Disconnected from db")
})

mongoose.connection.on("error", (error) => {
  console.error("Mongodb Connection Error", error)
})


// Todo Schema
const TodoSchema = new mongoose.Schema({
  // _id
  text: {
     type: String
  },

  status: {
    type: Boolean
  }
})
// Create todo model
// Model allows you to access the collections on mongodb
const Todo = mongoose.model('todo', TodoSchema)


// Initialise the express server
const app = express();

// Telling express to parse json data coming form UI
app.use(express.json());

// Will be used when you send data as `URL Query` param
app.use(express.urlencoded({ extended: true }));

// Listening to `/`

// Read todos
app.get('/todos', async function (req, res) {
  const todos = await Todo.find()  
  res.send(todos)
});


// Create todo
app.post('/todos', async function(req, res) {
  // Take value from the post body
  const todo = {
    text: req.body.text
  }
  // Create new todo
  Todo.create(todo)

  // Read about HTTP status'
  res
  .status(201)
  .send('OK')
})


app.put('/todos/:todoId', async function(req, res) {

  const todo = Todo.findOneAndUpdate({
    _id: req.params.todoId
  }, {
    ...req.body
  }, {

  })

  res.send(todo)

});



// Starting server on port 9090
app.listen(PORT, function () {
  console.log("Server started")
});
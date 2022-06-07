const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { stringify } = require("nodemon/lib/utils")

const app = express()
app.use(express.json)
app.use(express.urlencoded)
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB ", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DbConnected")
})

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)


//routes
app.post("/login", (req, res) => {
    res.send("My Api login")
})

app.post("/register", (req, res) => {
    res.send("My Api register")
})


app.listen(9002, () => {
    console.log("BE started at port 9002")
})
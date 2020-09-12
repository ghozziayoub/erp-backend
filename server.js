const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('./db/config')

const userController = require("./controllers/userController")
const taskController = require("./controllers/taskController")

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use("/member", userController)
app.use("/task", taskController)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the server")
})

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
})
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.status(200).send("Welcome to task controller")
})

module.exports = app
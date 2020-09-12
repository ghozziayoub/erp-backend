const mongoose = require('mongoose')

const taskSchema = {

    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true,
        unique: true
    },

    //el wa9t
    label: {
        type: String,
        require: true
    },

    state: {
        type: Boolean,
        default: false
    },

}

const Task = new mongoose.model('task', taskSchema)

module.exports = Task
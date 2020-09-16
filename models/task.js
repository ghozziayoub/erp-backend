const mongoose = require('mongoose')

const taskSchema = {

    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    label: {
        type: String,
        require: true
    },
    //planned-tasks work-in-progress finished-tasks
    state: {
        type: String,
        default: "planned-tasks"
    },
    member_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        require: true
    },
    member: {
        type: mongoose.Schema.Types.Mixed,
        require: true
    }

}

const Task = new mongoose.model('task', taskSchema)

module.exports = Task
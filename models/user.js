const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        require: true
    },

    lastname: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    phone: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    gender: {
        type: String,
        require: true
    },

    birthday: {
        type: Date,
        require: true
    },

    level: {
        type: String,
        require: true
    },

    since: {
        type: String,
        require: true
    },

    department: {
        type: String,
        require: true
    },

    role: {
        type: String,
        require: true,
        default: "member"
    },

    accountState: {
        type: Boolean,
        default: true
    },

})

const User = new mongoose.model('user', userSchema)

module.exports = { User, userSchema }
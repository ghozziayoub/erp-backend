const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/erp-db"

const MONGODB_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose.connect(MONGODB_URI, MONGODB_OPTIONS)

module.exports = mongoose
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://testinguser:azerty147258369@cluster0.hsewk.gcp.mongodb.net/erp-db?retryWrites=true&w=majority"

const MONGODB_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

mongoose.connect(MONGODB_URI, MONGODB_OPTIONS)

module.exports = mongoose
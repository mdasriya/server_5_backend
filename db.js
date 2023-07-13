const mongoose = require("mongoose")
require("dotenv").config()
const connection = mongoose.connect("mongodb+srv://mukesh:dasriya@cluster0.lmlzinx.mongodb.net/instgram_cloud?retryWrites=true&w=majority")

module.exports = {
    connection
}
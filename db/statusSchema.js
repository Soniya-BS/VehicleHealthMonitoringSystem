const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    vehicalstatus:{
        type:String,
        required: true,
    }
})

module.exports = statusSchema;
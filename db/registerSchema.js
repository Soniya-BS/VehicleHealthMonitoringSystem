const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:Number,
        required: true,
    },
    confirmpassword:{
        type:Number,
        required: true,
    },
    vehiclenumber:{
        type:Number,
        required: true,
    },
    chasinumber:{
        type:Number,
        required: true,
    }
})

module.exports = registerSchema;
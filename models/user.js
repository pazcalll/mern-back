const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 12
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 100
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
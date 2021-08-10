const mongoose = require('mongoose')

const goodsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    goodsToChannel: {
        type: String,
        required: true
    },
    goodsDate: {
        type: Date,
        required: true,
        default: Date.now
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Goods', goodsSchema)
const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const ItemModel = mongoose.model('items', ItemSchema)

module.exports = ItemModel;
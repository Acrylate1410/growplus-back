const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    sortFodder: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    note: {
        required: false,
        type: Number
    },
    status: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Order', dataSchema)
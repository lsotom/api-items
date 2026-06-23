const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es obligatorio'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El campo precio es obligatorio']
    }
})

const Item = mongoose.model('item', itemSchema)

module.exports = Item
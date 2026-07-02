const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El campo email es requerido'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'El campo password es requerido'],
        minlength: 8,
        trim: true,
        select: false
    },
    avatar: {
        type: String,
        default: null
    }

})

userSchema.pre('save', async function() {
    if(!this.isModified('password')) {
        return 
    }

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.compararPassword = async function (passwordIngresado) {
    return bcrypt.compare(passwordIngresado, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User

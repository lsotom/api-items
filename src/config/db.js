const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Conectado')
    }
    catch(error) {
        console.log('Error conctando a la BD')
    }
}

module.exports = connectDB
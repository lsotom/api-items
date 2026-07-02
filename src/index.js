require('dotenv').config()
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const itemsRoutes = require('./routes/itemsRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 3000

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use('/items', itemsRoutes)
app.use('', authRoutes)
app.use('/users', userRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server corriendo en http://localhost:${PORT}`)
    })
})

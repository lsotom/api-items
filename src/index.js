require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const itemsRoutes = require('./routes/itemsRoutes')
const authRoutes = require('./routes/authRoutes')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use('/items', itemsRoutes)
app.use('', authRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server corriendo en http://localhost:${PORT}`)
    })
})

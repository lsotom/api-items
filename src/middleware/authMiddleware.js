const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next ) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: 'No esta autorizado!'})
        }

        const token = authHeader.split(' ')[1]

        const decode = jwt.verify(token, process.env.SECRET)

        req.user = await User.findById(decode.id)

        if(!req.user) {
            return res.status(401).json({ error: 'El usuario no existe!'})
        }

        next()
    }
    catch(error) {
        return res.status(401).json({ error: 'Token invalido'})
    }
}

module.exports = auth
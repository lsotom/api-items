const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    const SECRET = process.env.SECRET
    const EXPIRES_IN = process.env.EXPIRES_IN
    const token = jwt.sign({ id: userId }, SECRET, { expiresIn: EXPIRES_IN})

    return token
}

module.exports = generateToken
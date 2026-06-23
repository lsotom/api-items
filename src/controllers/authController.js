const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const register = async (req, res) => {

    try {
        const { nombre, email, password } = req.body

        const usuarioExiste = await User.find({ email })

        console.log(usuarioExiste)

        if (usuarioExiste.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' })
        }

        const user = new User({ nombre, email, password })
        await user.save()

        console.log(user)

        res.status(201).json({ id: user._id, nombre: user.nombre, email: user.email })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error registrando el usuario' })
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).json({ error: 'El email y el password son requeridos '})
        }

        const user = await User.findOne({ email }).select("+password")

        if(!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' })
        }

        const passwordCorrecto = await user.compararPassword(password)

        if(!passwordCorrecto) {
            return res.status(401).json({ error: 'Credenciales incorrectas' })
        }

        const token = generateToken(user._id)

        res.json({
            usuario: { id: user._id, nombre: user.nombre, email: user.email },
            token
        })

    }
    catch(error) {
        res.status(500).json( { error: 'Error iniciando la sesion' })
    }
}

module.exports = {
    register,
    login
}
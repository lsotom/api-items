const fs = require('fs')
const path = require('path')
const User = require('../models/userModel')

const getMe = async (req, res) => {
    res.status(200).json(req.user)
}

const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se recibio ningún archivo' })
        }

        if(req.user.avatar) {
            const avatarAnterior = path.join(__dirname, '..', req.user.avatar)
            if(fs.existsSync(avatarAnterior)) {
                fs.unlinkSync(avatarAnterior)
            }
        }

        const avatarPath = `uploads/avatars/${req.file.filename}`

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: avatarPath },
            { new: true }
        )

        res.status(200).json({ 
            mensaje: 'Avatar actualizado!',
            avatar: user.avatar
        })

    }
    catch (error) {
        res.status(500).json({ error: 'Error al subir el avatar' })
    }
}

const deleteAvatar = async (req, res) => {
    try {
        if(!req.user.avatar) {
            return res.status(400).json({ error: 'No tienes un avatar para eliminar' })
        }

        const avatar = path.join(__dirname, '../..', req.user.avatar)

        console.log(avatar)

        if(fs.existsSync(avatar)) {
            fs.unlinkSync(avatar)
        }

        await User.findByIdAndUpdate(req.user.id, { avatar: null })

        res.status(200).json({ mensaje: 'Avatar eliminado' })
    }
    catch(error) {
        res.status(500).json({ error: 'Error al eliminar el avatar' })
    }
}

module.exports = {
    getMe,
    uploadAvatar,
    deleteAvatar
}
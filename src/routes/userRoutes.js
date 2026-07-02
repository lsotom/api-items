const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

router.use(auth) // todas las rutas necesitan autenticación

router.get('/me', userController.getMe)
router.post('/me/avatar', upload.single('avatar'), userController.uploadAvatar)
router.delete('/me/avatar', userController.deleteAvatar)

module.exports = router
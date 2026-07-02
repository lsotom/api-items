const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const filename = `avatar-${req.user._id}-${Date.now()}${ext}`
        cb(null, filename)
    },
})

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png']
    if(allowed.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(new Error('Solo se permiten imagenes JPG o PNG'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2 MB
})

module.exports = upload
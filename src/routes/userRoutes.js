const express = require('express')
const route = new express.Router()
const {findproductId, fileUpload, photo, videUpload} = require('../controllers.js/userController')

const multer  = require('multer')

const upload = multer({ 
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png|mp4|JPG)$/)) {
            throw new Error('File not Supported')
        }
        callback(undefined, file)
    }
})

route.param('productId', findproductId)

//CREATE USER
route.post('/upload' ,upload.single("photo"), fileUpload);
route.post('/upload/video', upload.single("photo"), videUpload);
route.get('/upload/fetch/:productId' , photo);

module.exports = route
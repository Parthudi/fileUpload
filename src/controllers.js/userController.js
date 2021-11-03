const User = require("../model/usermodel");
const log4js = require("log4js")
const sharp = require("sharp")
const logger = log4js.getLogger()
logger.level = "debug"

    exports.findproductId = async(req, res, next, id) => {
        try{  
            const product = await User.findById(id)
            req.product = product
            next()
    
        } catch(error) {
        res.status(403).send(error)
        }
    }
    
    exports.fileUpload = async(req, res) => {
        try{
            let user = new User(req.body)
            console.log(req.file);
            let buffer = await sharp(req.file.buffer).resize({height:300, width:260}).toBuffer();
           
            req.user = user
            req.user.photo = buffer
          
            user = await req.user.save()
            res.status(201).json({message: "File Successfull Uploaded", user})
        }catch(error) {
            console.log(error.message);
            logger.error('Upload Failed')
            res.status(400).send({error : "File Failed To Upload, Please Try Again Later"})
        }
    }
    
    exports.videUpload = async(req, res) => {
        try{
            console.log("video");
            let user = new User(req.body)
            console.log(req.file);

            req.user = user
            req.user.photo = req.file.buffer;
          
            user = await req.user.save()
            res.status(201).json({message: "File Successfull Uploaded", user})
        }catch(error) {
            console.log(error.message);
            logger.error('Upload Failed')
            res.status(400).send({error : "File Failed To Upload, Please Try Again Later"})
        }
    }

    exports.photo = async(req, res, next)  => {
        if(req.product.photo) {
            console.log("photu :" ,req.product.photo);
            return res.status(201).send(req.product.photo)
            }
        next()
    }

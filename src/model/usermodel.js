const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    photo: {
            type: Buffer
         },
    }, 
    {
        timestamps: true
     })

const User = mongoose.model('User', userSchema)

module.exports = User
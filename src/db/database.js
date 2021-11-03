const mongoose = require('mongoose')

mongoose.connect( process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}).then(db => {
    console.log("Successfully Connected To DB ");
})


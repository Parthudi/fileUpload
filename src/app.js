const express = require('express')
require('./db/database')
const bodyParser = require('body-parser')
const cors = require("cors");
// const fileUpload = require('express-fileupload');
const morgon = require('morgan')

const userFileUpload = require('./routes/userRoutes')

const app = express()

app.use(morgon('dev')) 
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors());
// app.use(fileUpload())

app.use("/api", userFileUpload)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('server is running on ' +port)
})
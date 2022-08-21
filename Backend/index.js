const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const app = express();
const{errorHandler} =require('./middleware/error')
const connectDb = require('./config/db')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')


dotenv.config();

// middleware
app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(helmet())
app.use(morgan("common"))

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

// app.use(errorHandler)

app.listen(5000,()=>{
    console.log("Backend server is running!"); 
})
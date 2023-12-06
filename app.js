// Basic Lib Import
const express =require('express');
const router =require('./src/routes/api');
const app= new express();
const bodyParser =require('body-parser');
const path= require('path');
require("dotenv").config();


// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

// Database Lib Import
const mongoose =require('mongoose');
mongoose.set('strictQuery', true);
app.use(express.static('client/build'));

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


// Mongo DB Database Connection
let URL = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.nakaabb.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
let CONFIG = {
  user: process.env.USER,
  pass: process.env.PASS,
  autoIndex: true,
};

try {
  mongoose.connect(URL, CONFIG);
  console.log("DB Connected!");
} catch (err) {
  console.error(err);
}

// Routing Implement
app.use("/api/v1",router)

app.get('/', (req,res)=> res.json("Server is Running"));

// Add React Front End Routing
// app.get('*',function (req,res) {
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'))
// })

module.exports=app;

















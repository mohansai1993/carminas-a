const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database')
const app = express();
const mainRoutes = require('./routes/main')
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const path = require("path");
require('dotenv').config({path: './config/.env'})

connectDB()   

// app.use(cors({credentials:true,origin:'http://localhost:3000'}));

// Enable CORS for client origin only
const corsOptions = {
  credentials:true,
  origin : ['http://localhost:3000', 'https://localhost:3000'],
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(logger('dev'))

app.use('/', mainRoutes)

// Render React as View
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.listen(process.env.PORT, ()=>{
  console.log('Server is running, you better catch it!')
})  

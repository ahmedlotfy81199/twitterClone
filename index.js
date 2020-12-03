const express = require('express');
var app = express();
const authroutes = require('./routes/auth');
const postroutes = require('./routes/posts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const configer = require('./medleware/meddleware')
const multer = require('multer');
const path =require('path')
const Post=require('./model/Post')
const fs=require('fs');
app.use('/images', express.static(path.join(__dirname, 'images')))





//connect to db 
mongoose.connect('mongodb+srv://ak:123@cluster0.89hom.mongodb.net/ask?retryWrites=true&w=majority', () => console.log('DB connected ....'))





app.listen(3000, () => { console.log('Server is up....') });
app = configer(app);
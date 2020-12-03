const express = require('express');
const authroutes = require('../routes/auth');
const postroutes =require('../routes/posts');
const followroutes =require('../routes/follow')
const suggestedroutes=require('../routes/suggested');
const bodyParser=require('body-parser');
const suggested = require('../routes/suggested');
const path=require('path');

module.exports=  (app)=> {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
//routes middlewares
app.get('/',(req,res)=>{
    res.send('welcome please read the docs')
 })
app.use('/api/user', authroutes);
app.use('/api/posts',postroutes);
app.use('/api/follow',followroutes);
app.use('/api/suggested',suggested);
app.use('/images', express.static(path.join(__dirname, 'images')))



    return app;
}
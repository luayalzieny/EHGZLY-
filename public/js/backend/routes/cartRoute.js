const express=require('express');
const app=express();
const controller=require('./../controller/cartController')

app.get('/test',controller.get_menuRest)

app.post('/cart',controller.post_menuRest)


module.exports=app
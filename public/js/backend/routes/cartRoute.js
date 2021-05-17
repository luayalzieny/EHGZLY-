const express=require('express');
const app=express();
const controller=require('./../controller/cartController')

app.get('/test',controller.get_order)

app.post('/cart',controller.post_order)


//module.exports=app
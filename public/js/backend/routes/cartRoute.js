const express=require('express');
const app=express();
const controller=require('./../controller/cartController')

app.get('/test',controller.get_menuRest)

app.post('/cart',controller.post_menuRest)

app.get('/confirm_Order',controller.get_confirm_Order)

app.post('/confirm_Order',controller.post_confirm_Order)

app.get('/success',controller.get_success)

app.post('/review',controller.post_review)

module.exports=app
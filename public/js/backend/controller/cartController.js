const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const cart=require('./../model/cartModel')
const Math=require('mathjs')
app.use(bodyParser.urlencoded({extended:"true"}))
app.use(bodyParser.json());

let order={
    restuarant_name:"Mc",
        content:[{meal:"mchiken"
        }]
}
exports.get_order=(req,res)=>{
const order=new cart({
    _id:1,
    
    customer_id:Math.round(Math.random()*1000+1),
    order_number:Math.round(Math.random()*1000+1),
   
})
order.save((err)=>{
    if(err){
    console.log(err)}
})
    res.json(order)
}


exports.post_order=async(req,res)=>{
    await cart.updateOne({_id:1},{$push:{"dishes":order},
    delivery_time:30+" min",
    finishing_time:30+" min",
    total_price:100+"$"
},function(err){
        console.log(err)
    })

 await cart.findOne({_id:1},function(err,result){
    //send the order
    res.json(result)
})

//empty the cart
}
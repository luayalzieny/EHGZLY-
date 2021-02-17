const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const cart=require('./../model/cartModel')
const Math=require('mathjs')
app.use(bodyParser.urlencoded({extended:"true"}))
app.use(bodyParser.json());

let order={
        content:[{meal:"mchiken"
        }]
}
//routes function
// cart order is created when entering the meals page with order
// number generated and customer id placed 
exports.get_order=(req,res)=>{
const order=new cart({
    _id:1,
    
    customer_id:Math.round(Math.random()*1000+1),
    order_number:Math.round(Math.random()*1000+1),
    restaurant_name:"mac" ,
    total_price:0
})
order.save((err)=>{
    if(err){
    console.log(err)}
})
    res.json(order)
}

// the dishes,deliverytime ,finishing time and total price are left empty
// until the customer chooses a meal to be added to dishes array in cart
exports.post_order=(req,res)=>{
    cart.updateOne({_id:1},
    {
    // dishes:{$push:order},
    delivery_time:30+" min",
    finishing_time:30+" min",
    $inc:{total_price:50}
},function(err){
        if(err){
        console.log(err)
        res.json(err)
}else{
    res.send("data added")
}
})


}

//after order is sent the cart is emptied(route not yet made)
exports.delete_order=(req,res)=>{
cart.deleteOne({},function(err){
    console.log(err)
    res.json(err)
})


}
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cart=require('./../model/cartModel')
const restaurant=require('./../model/restaurantsModel')
const dish=require('./../../../../dummy data/category.json')
const rest=require('./../../../../dummy data/restaurant.json')
const Math=require('mathjs')
app.use(express.urlencoded({extended:"true"}))
app.use(express.json());


//routes function
// cart order is created when entering the meals page with order
// number generated and customer id placed 
exports.get_order=(req,res)=>{
const order=new cart({
    _id:rest.restaurant_1.id,
    
    customer_id:Math.round(Math.random()*1000+1),
    order_number:Math.round(Math.random()*1000+1),
    restaurant_name:rest.restaurant_1.name ,
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
    
let meal={meal:req.body.meal}

cart.updateOne({_id:1},
    {
    $push:{"dishes":meal},
    finishing_time:req.body.finishing_time+" min",
    $inc:{total_price:req.body.price}
},function(err){
        if(err){
        console.log(err)
        res.json(err)
        
        }else{
        cart.find({_id:1},function(err,rest){
        res.json(rest)
        })

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
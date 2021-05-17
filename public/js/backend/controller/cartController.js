const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cart=require('./../model/cartModel')
const rest=require('./../model/restaurantsModel')
// const dish=require('./../../../../dummy data/category.json')
// const rest=require('./../../../../dummy data/restaurant.json')
const Math=require('mathjs')

app.use(express.urlencoded({extended:"true"}))
app.use(express.json());


//routes function

// cart order is created when entering the meals page with order
// number generated and customer id placed 
exports.get_menuRest=(req,res)=>{

console.log(req.body)
    // rest.findOne({restaurantName:customName},function(err,result){
    //     if(err){
    //         return console.log(err)
    //     }
    //     if(!result){
    //         return res.render('erorr404')
    //     }
        
    //     const order=new cart({
    //         _id:1,
            
    //         customer_id:Math.round(Math.random()*1000+1),
    //         order_number:Math.round(Math.random()*1000+1),
    //         restaurant_name:1 ,
    //         total_price:0
    //     })
    //     order.save((err)=>{
    //         if(err){
    //        return console.log(err)}
    //     })

    //     //res.render('menu')
      
    // })

 res.render('test')

}

// the dishes,deliverytime ,finishing time and total price are left empty
// until the customer chooses a meal to be added to dishes array in cart
exports.post_menuRest=(req,res)=>{
    
// let meal={meal:req.body.mealname}

cart.updateOne({_id:1},
    {
    $push:{"dishes":req.body.mealname},
    finishing_time:req.body.finishing_time+" min",    
    total_price:req.body.total_price,
    customer_id:req.user._id,
    order_number:Math.round(Math.random()*1000+1),
    restaurant_name:req.body.restaurant_name ,
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

// const order=new cart({
//     order_number:Math.round(Math.random()*1000+1),
//     customer_id:req.user._id,
//     _id:1,
//     restaurant_name:req.body.restaurant_name,
//     // dishes:req.body.mealname,
//     notes:req.body.notes,
//     finishing_time:req.body.finishing_time,
    
//     total_price:req.body.total_price
// })

// order.save(err=>{
//     if(err){
//     console.log(err)
//        return res.json(err)
//     }
// cart.findOne({_id:1},function(err,result){
//     return res.json(result)
// })
// })

}

//after order is sent the cart is emptied(route not yet made)
exports.delete_order=(req,res)=>{
cart.deleteOne({},function(err){
    console.log(err)
    res.json(err)
})


}
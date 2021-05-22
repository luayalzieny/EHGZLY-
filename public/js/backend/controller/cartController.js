const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cart=require('./../model/cartModel')
const rest=require('./../model/restaurantsModel')
const user=require('./../model/userModel')
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
    console.log(req.body)
    cart.deleteOne({_id:req.user._id},function(err){
        if(err){
        console.log(err)
 
        }
        //res.json(err)
    })
if(!req.body.mealname){
    return res.redirect('back');
}
const order=new cart({
    order_number:Math.round(Math.random()*10000+1),
    customer_id:req.user._id,
    _id:req.user._id,
    restaurant_name:req.body.restaurant_name,
    dishes:req.body.mealname,
    notes:req.body.notes,
    finishing_time:req.body.finishing_time,
    
    total_price:req.body.total_price
})

order.save(err=>{
    if(err){
    console.log(err)
       return res.json(err)
    }
cart.findOne({_id:req.user._id},function(err,result){
    if(!result){
        return res.json("err")
    }
   // console.log(result)
    return res.redirect('/confirm_order')
})
})

}

exports.get_confirm_Order=(req,res)=>{
    cart.findOne({_id:req.user._id},function(err,result){
        if(err){
            return res.json(err)
        }
      return res.render("confirmation_page",{order:result})
    })
}


exports.post_confirm_Order=(req,res)=>{

cart.findOne({_id:req.user._id},function(err,result){
    if(err){
        console.log(err)
        return res.json(err)
    }
    let entry={
       dishes:result.dishes,
       _id:result.order_number,
       restaurantName:result.restaurant_name,
       notes: result.notes,
       Price: result.total_price+"$",
    }

        user.findOneAndUpdate({_id:req.user._id},{
        $push:{"history":entry}
        },function(err,result){
            if(err){
            console.log(err)
            return res.json(err)
                            }
    res.json(result)
})

// rest.updateOne({_id:result.},function(err,result){
//     if(err){
//         console.log(err)
//         return res.json(err)
//     }

// })


})


}





//after order is sent the cart is emptied(route not yet made)
exports.delete_order=(req,res)=>{



}
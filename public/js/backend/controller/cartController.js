const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cart=require('./../model/cartModel')
const rest=require('./../model/restaurantsModel')
const user=require('./../model/userModel')
const Math=require('mathjs')


app.use(express.urlencoded({extended:"true"}))
app.use(express.json());
//variables for date of post
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hour=date_ob.getHours()-10
let minute=date_ob.getMinutes()
let Time=year + "-" + month + "-" + date+' '+hour+":"+minute



//routes function

// cart order is created when entering the meals page with order
// number generated and customer id placed 
exports.get_menuRest=(req,res)=>{

console.log(req.body)

 res.render('test')

}

// the dishes,deliverytime ,finishing time and total price are left empty
// until the customer chooses a meal to be added to dishes array in cart
exports.post_menuRest=(req,res)=>{
    console.log(req.body)
    if(!req.body.mealname){
        return res.redirect('back');
    }
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
    Fname:req.user.Fname,
    customer_id:req.user._id,
    _id:req.user._id,
    restaurant_name:req.body.restaurant_name,
    restaurant_ID:req.body.restaurant_ID,
    dishes:req.body.mealname,
    notes:req.body.notes,
    finishing_time:req.body.finishing_time,
    total_price:req.body.total_price,
    meal_price:req.body.mealprice,
    payment_method:req.body.payment,
    img:req.body.img
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
        restaurant_ID:result.restaurant_ID,
        time:Time,
        meal_price:result.meal_price,
        payment_method:result.payment_method,
        finishing_time:result.finishing_time,
        // img:result.img
        
    }

        user.findOneAndUpdate({_id:req.user._id},{
        $push:{"history":entry}
        },function(err,result){
            if(err){
                console.log(err)
                return res.json(err)
                            }
             entry.user={Fname:result.Fname,
                Lname:result.Lname,
                email:result.email,
                number:result.number}

                console.log(entry)
    //res.json(result)
    rest.findOneAndUpdate({_id:entry.restaurant_ID},{
        $push:{"orders":entry}
       },function(err,result){
           if(err){
               console.log(err)
               return res.json(err)
              }
})

})
        res.redirect("/success")


})


}


exports.post_review=(req,res)=>{
    console.log(req.body)
    if(!req.body.review){
        return res.redirect('back');

    }
    let reviewPost={
        user_ID:req.user._id,
        user_Fname: req.user.Fname,
        restaurant_ID:req.body.restaurant_ID,
        restaurant_name:req.body.restaurant_name,
        review: req.body.review,
        time:Time
    }
    
     user.findOneAndUpdate({_id:req.user._id},{
         $push:{"reviews":reviewPost}
     },function(err,result){
         if(err){console.log(err)
             return res.json(err)
         }
     
        })

        rest.findOneAndUpdate({_id:req.body.restaurant_ID},{
            $push:{"reviews":reviewPost}
        },function(err,result){
            
            if(err){console.log(err)
                return res.json(err)
            }
                })
    return res.redirect('back');
}


exports.get_success=(req,res)=>{
res.render('succes')
}

//after order is sent the cart is emptied(route not yet made)
exports.delete_order=(req,res)=>{



}
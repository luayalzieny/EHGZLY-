const { model } = require("mongoose");
const restaurants = require("./../model/restaurantsModel");
mongoose=require("mongoose")
const express =require('express')
const app=express();
const path = require('path');

//menu update
module.exports.restaurant_updateMenu_post=(req,res)=>{
    restaurantID=req.session.passport.user
    oldobj=req.body[0]
    newobj=req.body[1]
    //console.log(oldobj.name)
    if(oldobj.name){
       
    restaurants.findOneAndUpdate({_id:restaurantID,'categories.category':oldobj.category},
    {$pull:{'categories.$.meal':{name:oldobj.name} },
   
}
    ,(err,rest)=>{
       if(err)
      console.log(err);
      console.log(rest)
      
           
       })
       restaurants.findOneAndUpdate({_id:restaurantID,'categories.category':oldobj.category},
    {$push:{'categories.$.meal':{name:newobj.name ,price:newobj.price,discreption:newobj.discreption} },
   
}
    ,(err,rest)=>{
       if(err)
      console.log(err);
      console.log(rest)
       res.send(rest)
           
       })
    }
    else{

        restaurants.findOneAndUpdate({_id:restaurantID,'categories.category':oldobj.category},
       
            {$set:{"categories.$.category":newobj.category,
            }},(err,rest)=>{
            if(err)
        console.log(err);
        res.send(rest)
            
        })
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////

//main information update 
module.exports.restaurant_updateMainInformation_post=(req,res)=>{
    restaurantID =req.session.passport.user;
    restaurants.findById({restaurantID},(err,rest)=>{
        if(err)
        console.log(err)
        restaurants.findByIdAndUpdate({restaurantID},{
            restaurantName:req.body.name||rest.restaurantName,
            restaurantPhone:req.body.restaurantPhone||rest.restaurantPhone,
            email:req.body.email||rest.email,
            username:req.body.username||rest.username,
            manger:req.body.manger||rest.manger,
            mangerPhone:req.body.mangerPhone||rest.mangerPhone
        },(err,rest2)=>{
            console.log(err)
        })
    })
    
}
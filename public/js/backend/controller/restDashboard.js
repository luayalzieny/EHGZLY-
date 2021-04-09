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
    //restaurantID =req.session.passport.user;
    restaurantID=5
    console.log(req.body)
    restaurants.findOne({_id:restaurantID},(err,rest)=>{
        if(err)
        console.log(err)
        if(req.body.cat){
            let data =new Array();
          cat=req.body.cat
          if(typeof cat =="string"){
              data =new Array(cat)
            }
            else{
            data=cat
        }

          data.forEach(element => {
              if(element !='0'){
              restaurants.findOneAndUpdate({_id:restaurantID},
      
                  {$push:{categories:{
                      category:element,
                      
                         }}},(err,rest)=>{
                                 if(err)
                                     console.log(err);
                  
                                        })
                             }
                        } 
          )}
        restaurants.findOneAndUpdate({_id:restaurantID},{
            restaurantName:req.body.restaurantName||rest.restaurantName,
            restaurantPhone:req.body.restaurantPhone||rest.restaurantPhone,
            email:req.body.email||rest.email,
            username:req.body.username||rest.username,
            manger:req.body.manger||rest.manger,
            mangerPhone:req.body.mangerPhone||rest.mangerPhone,
            img:req.body.img||rest.img||"no logo",
            coverimg:req.body.coverimg||rest.coverimg||"no cover",

        },(err,rest2)=>{
            if(err)
            console.log(err)
        })
    })
    res.redirect("/restprofile")  
}


////////////////////////////////////////////
//get
module.exports.rest_profile_get=(req,res)=>{
    //restaurantID =req.session.passport.user;
    restaurantID=5
    restaurants.findOne({_id:restaurantID},(err,rest)=>{
        if(err)
        console.log(err)
        
        let cats=rest.categories
        let cat=new Array();
        cats.forEach(element => {
            cat.push(element.category)
        });
        console.log(cat)
        res.render("./resturant-profile",{cat})
        })

   
    };
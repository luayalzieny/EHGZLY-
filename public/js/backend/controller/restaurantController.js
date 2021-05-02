const { model } = require("mongoose");
const restaurants = require("../model/restaurantsModel");
mongoose=require("mongoose")
const express =require('express')
const app=express();
const path = require('path');

////////////////////////////////////////////////////////////////////////////////////////////
//handel moongose erorrs function
let error={ restaurantName:"0",mangerPhone:"0",email:"0",password:"0",username:"0",manger:"0"}
let handelErrors=(err)=>{
  console.log(err.message, err.code);

  if (err.code === 11000) {
      let massage= err.message.slice(80,85)
      if(massage=="email")
      error.email = 'that email is already registered';
      else
      error.username = 'that username is already registered';
      console.log(massage)
    
  }
  if (err.message.includes('restaurant validation failed')) {
    
    Object.values(err.errors).forEach(({ properties }) => {
    
      error[properties.path] = properties.message;
      console.log (error[properties.path])
    });
  }
  
  
  return error;
} 

////////////////////////////////////////////////////////////////////////
//restaurant main post (name email.....) 
module.exports.restaurant_post=(req,res)=>{
 console.log(req.body)
 error={ restaurantName:"0",mangerPhone:"0",email:"0",password:"0",username:"0",manger:"0"}
    const rest=new restaurants({
        //_id:req.body.id,
        restaurantName:req.body.name,
        restaurantPhone:req.body.restaurantPhone,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
        manger:req.body.manger,
        mangerPhone:req.body.mangerPhone,
        address:req.body.address,
        kitchen:req.body.kitchen,
        img:"no logo",
        coverimg:"no cover",
        pickupfee:0,
        pickuptime:"none",
        //opentime:{open:req.body.open,close:req.body.close}
        
        
    }).save(err=>{
        if(err){
            let obj =handelErrors(err);
            console.log(obj)
            
            res.redirect("/restaurant")
          
        }

        else
        res.redirect("/restLogin")
    })

   
    
  
}
////////////////////////////////////////////////////////////////

//pushing restaurant's Locations post
module.exports.restaurantLocation_post=(req,res)=>{
    restaurantID =req.session.passport.user
    console.log(req.session)
let location={

    Coordinates:{Latitude:req.body.Latitude ,Longitude:req.body.Longitude},
    area:req.body.area
}
    restaurants.findOneAndUpdate({_id:restaurantID},
        {$push:{
            location:location
            
    }},(err,rest)=>{
        console.log(rest)
        
    })
    res.redirect("/categories")
  //  restaurants.findOne({restaurantName:restaurantName},(err,data)=>{
     //   res.send(data)
  //  })
}


///////////////////////////////////////////////////////////////////////////////////////////

//pushinig categories and meals post
module.exports.categories_post=(req,res)=>{

    console.log(req.session)
    restaurantID =req.session.passport.user._id;
  //  restaurantID=5
    console.log(restaurantID)
    let i=0
   // console.log(req.body)
    

 while(req.body[i]){
     newobj=req.body[i]

    //if category exists 
     restaurants.findOneAndUpdate({_id:restaurantID,'categories.category':newobj.category},
     
     {$push:{'categories.$.meal':{name:newobj.name ,price:newobj.price,description:newobj.description}
    }}
     ,(err,rest)=>{
        if(err)
        console.log(err);
            
         // if categoey dosen't exist
        if(rest==null){
        restaurants.findOneAndUpdate({_id:restaurantID},
        
            {$push:{categories:{
                category:newobj.category,
                meal:{name:newobj.name ,price:newobj.price,Description:newobj.Description}
            }}},(err,rest)=>{
            if(err)
        console.log("asd");
            
        })
    }
        })
        i=i+1
    }
     //   restaurants.findOne({_id:restaurantID},(err,data)=>{
      //      res.send(data)
       // })
     res.redirect("/restprofile")
    }
//////////////////////////////////////////////////////////////////////////////////

//get functions 
module.exports.restaurant_get=(req,res)=>{
    //console.log("gettt")
   
   
    res.render("./resturant-regestration.ejs",{error})
    };

    module.exports.login_get=(req,res)=>{
        res.render("./loginrest")
    }

   module.exports.location_get=(req,res)=>{
       res.send("location form")
   }
  
  // module.exports.categories_get= async (req,res)=>{
    //restaurantID=5
    
   
    //restaurants.findOne({_id:restaurantID},(err,rest)=>{
      //  if(err)
       // console.log(err)
        
       // let cats=rest.categories
       // let cat=new Array();
       // cats.forEach(element => {
        //    cat.push(element.category)
       // });
       // console.log(cat)
       // res.render("./restuant-profile.ejs",{cat})
       // })
    
 //  try{
   // cat = await getCat()
    
    //}
    //catch(err){
     //   console.log(err)
   // }

//}
//////////////////////////////////////////////////////////////////////////////////////
const { model } = require("mongoose");
const restaurants = require("../models/restaurantsModell");

//pushing restaurant's Locations post
let restaurantName=""
module.exports.restaurantLocation_post=(req,res)=>{
    if(req.body.restaurantName)
        restaurantName=req.body.restaurantName

let location={
    phone:req.body.phone,
    Coordinates:{Latitude:req.body.Latitude ,Longitude:req.body.Longitude},
    area:req.body.area
}
    restaurants.findOneAndUpdate({restaurantName:restaurantName},
        {$push:{
            location:location
            
    }},(err,rest)=>{
        console.log(rest)
        
    })
    restaurants.findOne({restaurantName:restaurantName},(err,data)=>{
        res.send(data)
    })
}


//end here
//handel moongose erorrs function
let error={ restaurantName:"0",ownerPhone:"0",email:"0",password:"0",'opentime.open':"0",'opentime.close':"0"}
let handelErrors=(err)=>{
  console.log(err.message, err.code);
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
  if (err.message.includes('restaurant validation failed')) {
    
    Object.values(err.errors).forEach(({ properties }) => {
    
      error[properties.path] = properties.message;
      console.log (error[properties.path])
    });
  }
  
  
  return error;
} 
//restaurant_post 
module.exports.restaurant_post=(req,res)=>{
console.log(req.body)

    const rest=new restaurants({
        restaurantName:req.body.restaurantName,
        email:req.body.email,
        password:req.body.password,
        owner:req.body.owner,
        ownerPhone:req.body.ownerPhone,
        
        opentime:{open:req.body.open,close:req.body.close}
    }).save(err=>{
        if(err){
            let errors= handelErrors(err);
            console.log(errors)
          
        }
        console.log("sdadsa")
    })
     
    restaurantName=req.body.restaurantName
  res.redirect("/location")
}
//end here

//pushinig categories and meals post

module.exports.categories_post=(req,res)=>{
    if(req.body.restaurantName)
        restaurantName=req.body.restaurantName
    //if category exists 
     restaurants.findOneAndUpdate({restaurantName:restaurantName,'categories.category':req.body.category},
     
     {$push:{'categories.$.meal':{name:req.body.name ,price:req.body.price,discreption:req.body.discreption}
    }}
     ,(err,rest)=>{
        if(err)
        console.log(err);
            
         // if categoey dosen't exist
        if(rest==null){
        restaurants.findOneAndUpdate({restaurantName:restaurantName},
        
            {$push:{categories:{
                category:req.body.category,
                meal:{name:req.body.name ,price:req.body.price,discreption:req.body.discreption}
            }}},(err,rest)=>{
            if(err)
        console.log(err);
            
        })
    }
        })

        restaurants.findOne({restaurantName:restaurantName},(err,data)=>{
            res.send(data)
        })
    
    }
//end here

module.exports.restaurant_get=(req,res)=>{
    //console.log("gettt")
    res.send("information form")
    };


   module.exports.location_get=(req,res)=>{
       res.send("location form")
   }

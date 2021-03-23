const { model } = require("mongoose");
const restaurants = require("../model/restaurantsModel");
mongoose=require("mongoose")

//handel moongose erorrs function
let error={ restaurantName:"0",mangerPhone:"0",email:"0",password:"0",username:"0"}
let handelErrors=(err)=>{
  console.log(err.message, err.code);
  if (err.code === 11000) {
    error.username = 'that username is already registered';
    return error;
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
    
    const rest=new restaurants({
        _id:req.body.id,
        restaurantName:req.body.name,
        restaurantPhone:req.body.restaurantPhone,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
        manger:req.body.manger,
        mangerPhone:req.body.mangerPhone,
        img:req.body.img,
        opentime:{open:req.body.open,close:req.body.close}
        
        
    }).save(err=>{
        if(err){
            let errors= handelErrors(err);
            console.log(errors)
          
        }
        console.log("sdadsa")

    })
   
    
  res.redirect("/location")
}
//end here
//pushing restaurant's Locations post

module.exports.restaurantLocation_post=(req,res)=>{
    restaurantID =req.session.passport.user
let location={
    phone:req.body.phone,
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


//end here
//pushinig categories and meals post

module.exports.categories_post=(req,res)=>{
    restaurantID =req.session.passport.user
 
    //if category exists 
     restaurants.findOneAndUpdate({_id:restaurantID,'categories.category':req.body.category},
     
     {$push:{'categories.$.meal':{name:req.body.name ,price:req.body.price,discreption:req.body.discreption}
    }}
     ,(err,rest)=>{
        if(err)
        console.log(err);
            
         // if categoey dosen't exist
        if(rest==null){
        restaurants.findOneAndUpdate({_id:restaurantID},
        
            {$push:{categories:{
                category:req.body.category,
                meal:{name:req.body.name ,price:req.body.price,discreption:req.body.discreption}
            }}},(err,rest)=>{
            if(err)
        console.log(err);
            
        })
    }
        })

        restaurants.findOne({_id:restaurantID},(err,data)=>{
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

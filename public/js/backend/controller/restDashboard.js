const { model } = require("mongoose");
const restaurants = require("./../model/restaurantsModel");
mongoose=require("mongoose")
const express =require('express')
const app=express();
const path = require('path');
const bcrypt = require('bcrypt');
const mimeType=['image/jpeg','image/png','images/gif']
/////////////////////////////////////////////////////////////////////////////
//error handeling
let error={ email:"0",password:"0",username:"0",restaurantPhone:"0"}
let handelErrors=(err)=>{
    console.log(err.message, err.code);
  
    if (err.code === 11000) {
        let massage= err.message.slice(80,85)
        if(massage=="email")
        error.email = 'that email is already registered';
        else if(massaage="usern")
        error.username = 'that username is already registered';
        else
        error.restaurantPhone='that phone is already registered'
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
//menu update
module.exports.restaurant_updateMenu_post=(req,res)=>{
    if(!req.session.passport.user){
        res.redirect("/restLogin")
    }
    console.log(req.body)
    restaurantID=req.session.passport.user._id
   
    
    if(req.body.oldname){
       
    restaurants.findOneAndUpdate({_id:restaurantID,'categories.category':req.body.oldcategory},
    {$pull:{'categories.$.meal':{name:req.body.oldname} },
   
}
    ,(err,rest)=>{
       if(err)
      console.log(err);
      console.log(rest)
      
           
       })
       restaurants.findOneAndUpdate({_id:restaurantID,'categories.category':req.body.oldcategory},
    {$push:{'categories.$.meal':{name:req.body.newname,price:req.body.newprice,description:req.body.newdescription} },
   
}
    ,(err,rest)=>{
       if(err)
      console.log(err);
      console.log(rest)
       
           
       })
    }
    else{

        restaurants.findOneAndUpdate({_id:restaurantID,'categories.category':req.body.oldcategory},
       
            {$set:{"categories.$.category":req.body.category,
            }},(err,rest)=>{
            if(err)
        console.log(err);
       
            
        })
    }
    res.redirect("restprofile")
}
/////////////////////////////////////////////////////////////////////////////////////////////////////

//main information update 
module.exports.restaurant_updateMainInformation_post=(req,res)=>{
  //  if(!req.session.passport.user){
    //    res.redirect("/restLogin")
   // }
    restaurantID =req.session.passport.user._id;
    //restaurantID=7
   
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
 
        console.log(req.body.coverimg)
          function imgtest(img){
            if(img){
              const image=JSON.parse(img)
              let imgbuffer= new Buffer.from(image.data,'base64')
              let imgtype=image.type
              let alo={imgbuffer,imgtype}
              return alo
            }
           
                return {imgbuffer:null,imgtype:null};
            
        }
       imagesittings=imgtest(req.body.img)
       imgbuffer=imagesittings.imgbuffer
       imgtype=imagesittings.imgtype
       console.log(imgbuffer)
       console.log(imgtype)
       console.log(req.body.coverimage)
       
       function coverimgtest(img){
           if(img){
          const coverimage=JSON.parse(req.body.coverimg)
          let coverimgbuffer= new Buffer.from(coverimage.data,'base64')
          let coverimgtype=coverimage.type
          let coverimgsittings={coverimgbuffer,coverimgtype}
          return coverimgsittings
           }
           return  {coverimgbuffer:null,coverimgtype:null}
       }
       coverimgsittings=coverimgtest(req.body.coverimg)
       coverimgbuffer=coverimgsittings.coverimgbuffer
       coverimgtype=coverimgsittings.coverimgtype

        // UPDATE LOCATION
        restaurants.findOneAndUpdate({_id:restaurantID},{
            location:{type:"Point", coordinates:req.body.loc.split(', ').reverse(), formattedAddress:req.body.address},
        },(err,rest2)=>{                                                            
            if(err)
          error=handelErrors(err)
           console.log(error)
        })
        
        // UPDATE RESTAURANT DATA
        restaurants.findOneAndUpdate({_id:restaurantID},{
            restaurantName:req.body.restaurantName||rest.restaurantName,
            restaurantPhone:req.body.restaurantPhone||rest.restaurantPhone,
            email:req.body.email||rest.email,
            username:req.body.username||rest.username,
            manger:req.body.manger||rest.manger,
            mangerPhone:req.body.mangerPhone||rest.mangerPhone,
            img:{
                imageBuffer:imgbuffer||rest.img.imageBuffer,
                imageType:imgtype||rest.img.imageType
            },
            coverimg:{
                imageBuffer:coverimgbuffer||rest.coverimg.imageBuffer,
                imageType:coverimgtype||rest.coverimg.imageType
            },
            pickupfee:req.body.pickupfee||rest.pickupfee||0,
            pickuptime:req.body.pickuptime||rest.pickuptime||"none",
            info:req.body.info||rest.info||"none",

        },(err,rest2)=>{
            if(err)
          error=handelErrors(err)
           console.log(error)
        })
    })
    if(req.body.Latitude){
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
    }
    res.redirect("/restprofile")  
}


////////////////////////////////////////////

module.exports.changeRestPass_post=(req,res)=>{
        restaurantID =req.session.passport.user._id;
        let password=""
        restaurants.findOne({_id:restaurantID},(err,rest)=>{
            if (err)
            console.log(err)
            
            password=rest.password
        })
        bcrypt.compare(password,req.body.oldpassword,function(err,result){
            if (err)
            console.log(err)

            if(result){
                restaurants.findOneAndUpdate({_id:restaurantID},{
                    password:req.body.newpassport
                })
            }
            else{
                error.password="worg password"
                //wrong password
            }
        
            
        })
        
        res.redirect("/restprofile")
    }
    module.exports.deletRest_post=(req,res)=>{
        restaurantID =req.session.passport.user._id;
        
        restaurants.findOneAndRemove({_id:restaurantID},(err,rest)=>{
            if (err)
            console.log(err)
        })
        
        
        res.redirect("/restLogin")
    }

    ////////////////////////////////////////////////////////////////////////////
    module.exports.deletcategryandmeals=(req,res)=>{
        restaurantID=req.session.passport.user._id
        console.log(req.body)
   
    
    if(req.body.oldname){
       
    restaurants.findOneAndUpdate({_id:restaurantID,'categories.category':req.body.oldcategory},
    {$pull:{'categories.$.meal':{name:req.body.oldname} },
   
}
    ,(err,rest)=>{
       if(err)
      console.log(err);
      console.log(rest)
      
           
       })
    }
    else{

       
    restaurants.findOneAndUpdate({_id:restaurantID},
    {$pull:{categories:{category:req.body.oldcategory }},
   
    } 

    ,(err,rest)=>{
       if(err)
      console.log(err);
      console.log(rest)
      
           
       })
    }
    res.redirect("/restprofile")
}
    /////////////////////////////////////////////////////////////////

    //get
    module.exports.rest_profile_get=(req,res,next)=>{
        if(!req.session.passport){
            res.redirect("/restLogin")
        }
        else if(!req.session.passport.user.restaurantName){
            res.redirect("/restLogin")
        }
        else{
       // console.log(req.session.passport.user)
        restaurantID =req.session.passport.user._id;
      
        //restaurantID=7
       //console.log(restaurantID)
        restaurants.findOne({_id:restaurantID},(err,rest)=>{
            if(err)
            console.log(err)
            
            let cats=rest.categories
            //console.log(cats)
            let cat=new Array();
            cats.forEach(element => {
                cat.push(element.category)
            });
            //console.log(cat)
            console.log(error)
            let errorss=error
            let coverimg=rest.coverimg
            error={ email:"0",password:"0",username:"0",restaurantPhone:"0"}
            res.render("./resturant-profile",{cat,cats,errorss,coverimg,rest})
            })
    
      
        }
        console.log(error)
        };

       // module.exports.test=(req,res)=>{
        //    restaurantID=38
        //    restaurants.findOne({_id:restaurantID},(err,rest)=>{
        //        res.render("./Ordering",{rest})
       //     })
    //    }
       module.exports.testpost=(req,res)=>{
           console.log(req.body)
           res.render("test")
       }
       module.exports.addCat=(req,res)=>{
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
          res.redirect("/restprofile")

    }
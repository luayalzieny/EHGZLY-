const { model } = require("mongoose");
const restaurants = require("../model/restaurantsModel");
mongoose=require("mongoose")
const express =require('express')
const app=express();
const path = require('path');
const Pusher = require("pusher");
const alert = require('alert');
const sendSms = require('./twilio');

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
        res.render("./newlogin")
    }

   module.exports.location_get=(req,res)=>{
       res.send("location form")
   }
  
  

// restaurant orders 
module.exports.getOrder= (req, res) => {
  
    global.id = req.params.id;
    let user =req.user
    restaurants.findById(id).then((result)=>{
      res.render('Ordering', {rest:result,user});
    }).catch(err => {console.log(err)});
    
}
//////////////////////////////////////////////////////////////////////////////////////
// add Tables
module.exports.table=(req,res)=>{

  console.log(req.session)
  restaurantID =req.session.passport.user._id;
 
      restaurants.findOneAndUpdate({_id:restaurantID},
      
          {$push:{Tables:{
            tableNumber:req.body.tableNumber,
            numberOfPerson:req.body.people
          }}},(err,rest)=>{
          if(err)
      console.log(err);
          
      })
  
   res.redirect("/allTables/" + restaurantID)
  }
//////////////////////////////////////////////////////////////////////////////////
//get all tables
module.exports.geTables=(req,res)=>{

  const id = req.params.id;
  restaurants.findById(id).then((result)=>{
    res.render('allTables', {rest:result});
  }).catch(err => {console.log(err)});

}
//////////////////////////////////////////////////////////////////////////////////
// make reservations
module.exports.reservation=(req,res)=>{

  // the single tables reservations
  const tableid = req.body.table;
  restaurants.findOneAndUpdate({_id:id, 'Tables._id':tableid },
      {
          $addToSet:
          {
              'Tables.$.booking':
                  {
                    starTime:req.body.start,
                    endTime:req.body.end
                  }
          },
      }
      ,(err,rest)=>{
        if(err)
       console.log(err);       
  })
     
  // all the reservations
  restaurants.findOneAndUpdate({_id:id},
  {
   $addToSet:
   {
     reservations:
     { fname:req.body.fname,
       lname:req.body.lname,
       email:req.body.email,
       phone:req.body.phone,
       tableId:req.body.table,
       starTime:req.body.start,
       endTime:req.body.end,
       instructions:req.body.instructions
  
     } 
   },
  
  }
  ,(err,rest)=>{
  
   const phone = "+2"+req.body.phone;
   const fname = req.body.fname;
   const lname = req.body.lname;
   const startTime = req.body.start;
   const endTime = req.body.end;
   const tableId = req.body.table

/*
   let Pusher = require('pusher');
                let pusher = new Pusher({
                    appId: "1218013",
                    key: "cec6a5d9e1c6f055500d",
                    secret: "e612687f4e81c52620fc",
                    cluster: "mt1",
                    useTLS: true
                });
    
                pusher.trigger('notifications', 'reservation', rest, req.headers['x-socket-id']);*/

  alert('Successfully Submitted ❤, Please check your phone 📱');

  const welcomeMessage = 'Thank you ' + fname +' '+ lname +' for your reservation to '+ rest.restaurantName +' restaurant at ' + startTime;
   
  //sendSms(phone, welcomeMessage);
  
   
  
    if(err)
   console.log(err);
   /*console.log(rest)
   console.log(id)*/
 
  
   
  }) 
    res.redirect('/ordering/'+id);
 }
  /////////////////////////////////////////////////////////////////////////////////////////////////////
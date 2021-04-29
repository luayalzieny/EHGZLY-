const restaurant=require("../model/restaurantsModel")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const express=require('express');
const app=express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const customFields={
  usernameField:"email",
  passwordField:"password"
}
passport.use('rest',new LocalStrategy(customFields,(email,password,done)=>{
  restaurant.findOne({$or:[{email},{username:email}]},(err,user)=>{
    console.log(email)
      if(err){
          return done(err)
      };
      
      if(!user){
          return done(null,false,{message:"Email doesn't exist"})
      };
      
      bcrypt.compare(password,user.password,function(err,result){
          if(result){

              return done(null,user)
          }else{
              return done(null,false,{message:"Password incorrect"})
          }
      })
  })
}))
//end of user passport authorization


//passport serialization && deserialization
passport.serializeUser(function (rest,done){
   console.log("ok")
  done(null,rest.id)});

passport.deserializeUser((_id,done)=>{
  restaurant.findById({_id},function(err,user){
      if(err){
          console.log(err.message)
      }
  return done(err,user)
  })
})
  module.exports = passport
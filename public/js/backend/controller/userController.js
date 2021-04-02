//modules used
const express=require('express');
const app=express();
//const bodyParser=require('body-parser');bodyParser
const bcrypt=require('bcrypt');
//const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require('../model/userModel')
// end of modules used

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//user passport authorization
const customFields={
    usernameField:"email",
    passwordField:"password"
}
passport.use(new LocalStrategy(customFields,(email,password,done)=>{
    User.findOne({email},(err,user)=>{
        if(err){
            return done(err)
        };
        
        if(!user){
            return done(null,false,{message:"Email Doesn't Exist"})
        };
        
        bcrypt.compare(password,user.password,function(err,result){
            if(result){
                return done(null,user)
            }else{
                return done(null,false,{message:"Password Incorrect"})
            }
        })
    })
}))
//end of user passport authorization


//passport serialization && deserialization
passport.serializeUser((user,done)=>done(null,user.id));

passport.deserializeUser((_id,done)=>{
    User.findById({_id},function(err,user){
        if(err){
            console.log(err.message)
        }
    return done(err,user)
    })
})
//end of passport serialization/deserialization



//basic functions


//handle errors
const handleErrors=(err,numb)=>{
    const errors={Fname:"",Lname:"",email:"",password:"",number:""}
    
    //duplication error
    if(err.code===11000 && Object.entries(err.keyValue)[0][0]=="email" ){
        
      errors.email=Object.entries(err.keyValue)[0][0]+" already exists"
        
    }
    
    if(err.code===11000 && Object.entries(err.keyValue)[0][0]=="number")
    errors.number=Object.entries(err.keyValue)[0][0]+" already exists"

console.log(err)
    // end of duplication error
    
    //number validation
    if(numb[0]!=="0" && numb[1]!=="1"){
  
        errors.number="Enter a valid number"
       }
    //end of number validation

    //validation errors
    if(err.message.includes("userModel validation failed")){
        Object.values(err.errors).forEach((error)=>{
            errors[error.properties.path]=error.properties.message
        })
    }
    //end of validation errors
    return errors
}
//end of handle errors


function checkAuthentication(req,res){
    if(req.isAuthenticated()){
      return res.redirect('/')
      }
    }
    
  function checkNotAuthentication(req,res){
    if(!req.isAuthenticated()){
    return res.redirect('/')
}
    }

    
//end of basic functions



// routes functions
exports.get_home=(req,res)=>{
    res.render("index",{user:req.user})
};

exports.post_home=(req,res)=>{
//search to be made
};

exports.get_about=(req,res)=>{
    res.render("about",{user:req.user})
};

exports.get_faqs=(req,res)=>{
    res.render("faqs",{user:req.user})
};

exports.get_contact=(req,res)=>{
    res.render("contact",{user:req.user})
};

exports.get_how_it_work=(req,res)=>{
    res.render("how_it_work",{user:req.user})
};


exports.get_login_page=(req,res)=>{
    checkAuthentication(req,res)
    res.render("loginpage" )
};


exports.get_payment=(req,res)=>{
    res.render("payment")
}


exports.get_ordering=(req,res)=>{
    res.render("Ordering" )
};

exports.post_ordering=(req,res)=>{

}


exports.get_sign_up_page=(req,res)=>{
    checkAuthentication(req,res)
    res.render("signuppage",{error:""})
};

exports.post_sign_up_page=(req,res)=>{
const newUser=new User({
    Fname:req.body.fname,
    Lname:req.body.lname,
    number:req.body.number,
    email:req.body.email,
    password:req.body.password

})
newUser.save((err)=>{
    if(err){
  const error=handleErrors(err,req.body.number)
  //console.log(error)
    res.render("signuppage",{error:error})
}else{
    res.redirect('/')
}


})
};

// end of routes functions


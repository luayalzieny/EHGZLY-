const express=require('express');
const app=express();
const bcrypt=require('bcrypt');
const User=require('../model/userModel')
// end of modules used

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//checks if a user is logged in

//route functions

exports.get_dashboard=(req,res)=>{
    console.log(req.user)

    if(!req.isAuthenticated()){
        return res.redirect('/')
        }
      
        res.render('User_Dashboard',{user:req.user})
  
}

exports.post_update_dashboard=(req,res)=>{
console.log(req.body)


    User.updateOne({_id:req.user._id},{
        Fname: req.body.Fname || req.user.Fname ,
    Lname:req.body.Lname||req.user.Lname,
    email:req.body.email||req.user.email,
    number:req.body.number||req.user.number
    },function(err){
        if(err)
        {console.log(err); res.redirect('/')
        }else{
            res.redirect('User_Dashboard')
        }

    })
}

exports.post_delete_dashboard=(req,res)=>{
    User.deleteOne({_id:req.user._id},function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        }
    })
}


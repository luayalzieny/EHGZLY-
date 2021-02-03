//modules used
const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User=require('./../model/userModel')
// end of modules used


//user passport authorization

//end of user passport authorization


//passport serialization/deserialization

//end of passport serialization/deserialization



//basic functions


//handle errors

//end of handle errors


//end of basic functions



// routes functions
exports.get_home=(req,res)=>{
    res.render("index")
};

exports.post_home=(req,res)=>{

};

exports.get_about=(req,res)=>{
    res.render("about")
};

exports.get_faqs=(req,res)=>{
    res.render("faqs")
};

exports.get_contact=(req,res)=>{
    res.render("contact")
};

exports.get_how_it_work=(req,res)=>{
    res.render("how_it_work")
};


exports.get_login_page=(req,res)=>{
    res.render("loginpage")
};

exports.post_login_page=(req,res)=>{

};

exports.get_sign_up_page=(req,res)=>{
    res.render("signuppage")
};

exports.post_sign_up_page=(req,res)=>{

};

// end of routes functions


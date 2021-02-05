// modules used
const express=require('express');
const app=express();
const controller=require('./../controller/controller');
const session=require('express-session');
const passport=require('passport');
const flash = require('express-flash');
const LocalStrategy = require("passport-local").Strategy;

// end of modules used

//middlewares

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(flash())

app.use(session({
  secret: "Fuck HTI, all my niggas Fuck HTI",
  resave: false,
  saveUninitialized: false ,
  //cookie: { maxAge: "TO BE DECIDED" }

}));

//end of middlewares

//routes
app.get('/',controller.get_home);
app.post('/',controller.post_home);

app.get('/faqs',controller.get_faqs);

app.get('/how_it_work',controller.get_how_it_work);

app.get('/signuppage',controller.get_sign_up_page);
app.post('/signuppage',controller.post_sign_up_page);

app.get('/loginpage',controller.get_login_page);
app.post('/loginpage',function(req,res,next){
  passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/loginpage",
    failureFlash:true
  })(req,res,next)
});

app.post('/logout',(req,res)=>{
  req.logOut();
  res.redirect("/")
})

app.get('/about',controller.get_about)

app.get('/contact_us',controller.get_contact)

module.exports=app
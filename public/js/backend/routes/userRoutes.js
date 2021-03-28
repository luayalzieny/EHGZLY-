// modules used
const express=require('express');
const app=express();
const session=require('express-session');
const passport=require('passport');
const flash = require('express-flash');
const controller=require('../controller/userController');
const User_Dashboard=require('./../controller/userDashboard')
// end of modules used

//middlewares

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
  secret: "FUCK HTI ,All my friends FUCK HTI",
  resave: false,
  saveUninitialized: false ,
  cookie: { maxAge: 6000000 }

}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//end of middlewares

//basic functions

//end of basic functions
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
  })(req,res,next)});

app.post('/logout',(req,res)=>{
  req.logOut();
  res.redirect("/")
})

app.get('/ordering',controller.get_ordering)

app.get('/about',controller.get_about)

app.get('/contact',controller.get_contact)

app.get('/User_Dashboard',User_Dashboard.get_dashboard)
app.post('/User_Update_Dashboard',User_Dashboard.post_update_dashboard)
app.post('/delete_profile',User_Dashboard.post_delete_dashboard)



module.exports=app
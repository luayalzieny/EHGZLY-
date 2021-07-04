const restaurantController=require("../controller/restaurantController")
const restaurantDashboard = require("../controller/restDashboard")
const dataJson=require("./../../../../dummy data/restaurant.json")
const passport = require("passport");
const session = require("express-session");
const flash = require('express-flash');

const express =require('express')
const app=express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())





app.use(passport.initialize())
app.use(passport.session())
app.use(flash())



app.post("/restaurant",restaurantController.restaurant_post);
app.post("/location",restaurantController.restaurantLocation_post)
app.post("/categories",restaurantController.categories_post)
app.post("/table",restaurantController.table)/////////1///////
app.post("/reservation",restaurantController.reservation)/////////2///////
app.post('/restLogin',function(req,res,next){
    passport.authenticate("rest",{
      successRedirect:"/restprofile",
      failureRedirect:"/restLogin",
      failureFlash:true
    })(req,res,next);
});

app.post('/restlogout',(req,res)=>{
  req.logOut();
  res.redirect("/restLogin")
})
app.post('/restChangePassword',restaurantDashboard.changeRestPass_post)
app.post("/update",restaurantDashboard.restaurant_updateMenu_post)
app.post("/updateRest",restaurantDashboard.restaurant_updateMainInformation_post)
app.post("/deletrest",restaurantDashboard.deletRest_post)
app.post("/deletcat",restaurantDashboard.deletcategryandmeals)
app.post("/test",restaurantDashboard.testpost)
app.post("/addCat",restaurantDashboard.addCat)


app.get("/restprofile",restaurantDashboard.rest_profile_get)
app.get("/restLogin",restaurantController.login_get)
app.get("/restaurant",restaurantController.restaurant_get);
app.get('/ordering/:id', restaurantController.getOrder)
app.get('/allTables/:id', restaurantController.geTables)///////////////3//////////
//app.get("/test",restaurantDashboard.test);
//app.get("/location",restaurantController.location_get)
//app.get("/categories",restaurantController.categories_get)
const cat_data=require("./../../../../dummy data/category.json")



module.exports= app;
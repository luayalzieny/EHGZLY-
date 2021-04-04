const restaurantController=require("../controller/restaurantController")
const restaurantDashboard = require("../controller/restDashboard")
const dataJson=require("./../../../../dummy data/restaurant.json")
const passport = require("passport");
const session = require("express-session");


const express =require('express')
const app=express();


app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: "FUCK HTI ,All my friends FUCK HTI",
  resave: false,
  saveUninitialized: false ,
  cookie: { maxAge: 6000000 }

}))
app.use(passport.initialize())
app.use(passport.session())




app.post("/restaurant",restaurantController.restaurant_post);
app.post("/location",restaurantController.restaurantLocation_post)
app.post("/categories",restaurantController.categories_post)
app.post('/restaurantLogin',function(req,res,next){
    passport.authenticate("local",{
      successRedirect:"/location",
      failureRedirect:"/restLogin",
    })(req,res,next);
});
app.post("/update",restaurantDashboard.restaurant_updateMenu_post)
//app.post("/updateRest",restaurantDashboard.restaurant_updateMainInformation_post)


app.get("/restLogin",restaurantController.login_get)
app.get("/restaurant",restaurantController.restaurant_get);
app.get("/location",restaurantController.location_get)
app.get("/categories",restaurantController.categories_get)
const cat_data=require("./../../../../dummy data/category.json")



module.exports= app;
const restaurant = require("../models/restaurantsModell");
const restaurantController=require("../controller/restaurantController")


const express =require('express')
const app=express();

app.post("/restaurant",restaurantController.restaurant_post);
app.post("/location",restaurantController.restaurantLocation_post)
app.post("/categories",restaurantController.categories_post)

app.get("/restaurant",restaurantController.restaurant_get);
app.get("/location",restaurantController.location_get)
module.exports= app;
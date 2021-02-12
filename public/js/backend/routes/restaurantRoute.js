const restaurant = require("../models/restaurantsModell");
const restaurantController=require("../controller/restaurantController")


const express =require('express')
const app=express();

app.get("/restaurant",restaurantController.restaurant_get);
app.post("/restaurant",restaurantController.restaurant_post);

app.get("/location",restaurantController.location_get)
app.post("/location",restaurantController.restaurantLocation_post)

app.post("/categories",restaurantController.categories_post)


module.exports= app;
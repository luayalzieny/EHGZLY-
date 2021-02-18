const restaurantController=require("../controller/restaurantController")
const dataJson=require("./../../../../dummy data/category.json")
const express =require('express')
const app=express();

app.get("/restaurant",restaurantController.restaurant_get);
app.post("/restaurant",restaurantController.restaurant_post);

app.get("/location",restaurantController.location_get)
app.post("/location",restaurantController.restaurantLocation_post)

app.post("/categories",restaurantController.categories_post)

app.get('/test',function(req,res){
    

    res.json(dataJson.restaurant_1.id)
})

module.exports= app;
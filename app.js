// Modules used
const express= require('express')
const app=express()
//const bodyParser=require('body-parser')
// const userRoute=require('./public/js/backend/routes/userRoutes')
require("./public/js/backend/config/db")
require("./public/js/backend/config/passport")
const restaurantsRoute=require("./public/js/backend/routes/restaurantRoute")
const cartRoute=require('./public/js/backend/routes/cartRoute')
// end of modules used


//middle wares used
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname))


app.set('view engine', 'ejs')
// end of middleware


// routes callback

// app.use(userRoute)
app.use(restaurantsRoute)
app.use(cartRoute)
// End of routes callback

// server running
var listener = app.listen(3000, function(){
    console.log('Up and running on http://localhost:'+ listener.address().port);
});

//end of server running
// Modules used
const express= require('express')
const app=express()
const bodyParser=require('body-parser')
const routes=require('./public/js/backend/routes/routes')
// end of modules used


//middle wares used
app.use(bodyParser.urlencoded({extended:"true"}))
app.use(bodyParser.json());
app.use(express.static(__dirname))


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
// end of middleware


// routes callback

app.use(routes)

// End of routes callback

// server running
var listener = app.listen(3000, function(){
    console.log('Up and running on http://localhost:'+ listener.address().port);
});

//end of server running
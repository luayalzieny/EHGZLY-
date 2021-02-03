// modules used
const express=require('express');
const app=express();
const controller=require('./../controller/controller')
const session=require('express-session')
// end of modules used

//middlewares

app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: "Fuck HTI, all my niggas Fuck HTI",
  resave: false,
  saveUninitialized: false ,
  //cookie: { maxAge: "TO BE DECIDED" }

}))

//end of middlewares

//routes
app.get('/',controller.get_home)
app.post('/',controller.post_home)

app.get('/faqs',controller.get_faqs)

app.get('/how_it_work',controller.get_how_it_work)

app.get('/sign_up',controller.get_sign_up_page)
app.post('/sign_up',controller.post_sign_up_page)

app.get('/login',controller.get_login_page)
app.post('/login',controller.post_login_page)


app.get('/about',controller.get_about)

app.get('/contact_us',controller.get_contact)

module.exports=app